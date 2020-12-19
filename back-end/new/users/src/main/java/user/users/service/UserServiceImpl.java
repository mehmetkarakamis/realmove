package user.users.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import user.users.DAO.ConfirmationTokenDAO;
import user.users.DAO.UserDAO;
import user.users.DTO.UserDTO;
import user.users.DTO.UserDetailDTO;
import user.users.feign.AmazonS3ServiceClient;
import user.users.entity.ConfirmationTokenEntity;
import user.users.entity.RoleEntity;
import user.users.entity.UserDetailEntity;
import user.users.entity.UserEntity;

@Service
public class UserServiceImpl implements IUserService {

    private Environment environment;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserDAO userDAO;
    private AmazonS3ServiceClient amazonS3ServiceClient;
    private ConfirmationTokenDAO confirmationTokenDAO;
    private EmailSenderService emailSenderService;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder, UserDAO userDAO,
            AmazonS3ServiceClient amazonS3ServiceClient, ConfirmationTokenDAO confirmationTokenDAO,
            EmailSenderService emailSenderService, Environment environment) {
        this.environment = environment;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDAO = userDAO;
        this.amazonS3ServiceClient = amazonS3ServiceClient;
        this.confirmationTokenDAO = confirmationTokenDAO;
        this.emailSenderService = emailSenderService;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {

        /// Set our user roles.
        Set<RoleEntity> roles = new HashSet<>();
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName("ROLE_USER");
        roles.add(roleEntity);

        /// Set our user's other necessary fields.
        userDTO.setUserId(UUID.randomUUID().toString());
        userDTO.setEncryptedPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
        userDTO.setEnabled(false);
        userDTO.setRoles(roles);

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        /// Convert userDTO to UserEntity to save user into the database.
        UserEntity userEntity = modelMapper.map(userDTO, UserEntity.class);

        /// Create our UserDetailEntity to create emty user details into the database.
        UserDetailEntity userDetailEntity = new UserDetailEntity();
        userEntity.setUserDetail(userDetailEntity);

        /// Save our UserEntity to the database.
        userDAO.save(userEntity);
        /// Create our ConfirmationTokenEntity to create token. Passed UserEntity
        /// because in database
        /// there will be one to one relationship so, UserEntity needed.
        ConfirmationTokenEntity confirmationToken = new ConfirmationTokenEntity(userEntity);
        confirmationTokenDAO.save(confirmationToken);

        /// Create our SimpleMailMessage to send our mail to the registered user.
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEntity.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom(environment.getProperty("spring.mail.username").toString());
        mailMessage.setText("To confirm your account, please click here : "
                +environment.getProperty("confirm.mail.url").toString()
                + "users-ws/api/user/confirm-account?mailToken="
                + confirmationToken.getConfirmationToken());
        /// Sent the email to the user.
        emailSenderService.sendEmail(mailMessage);

        /// Created our returnValue to sent it to the frontend.
        UserDTO returnValue = modelMapper.map(userEntity, UserDTO.class);

        /// Sent returnValue to the UserController.
        return returnValue;
    }

    @Override
    public UserDTO getUser(String userId) {
        
        UserEntity userEntity = userDAO.findByUserId(userId);

        if(userEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDTO returnValue = modelMapper.map(userEntity, UserDTO.class);

        return returnValue;
    }

    /// -----------------------This method imported from Spring UserDetailsService-----------------------
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntity = userDAO.findByEmail(username);

        if (userEntity == null)
            throw new UsernameNotFoundException(username);
        /// MyUserDetailModel implements org.springframework.security.core.userdetails;
        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), userEntity.isEnabled(), true, true,
                true, new ArrayList<>());
    }
    /// -----------------------This method imported from Spring UserDetailsService-----------------------
    
    @Override
    public UserDTO getUserByEmail(String email) {

        UserEntity userEntity = userDAO.findByEmail(email);

        if (userEntity == null)
            throw new UsernameNotFoundException(email);

        return new ModelMapper().map(userEntity, UserDTO.class);
    }

    @Override
    public UserEntity saveUser(UserDTO userDTO) {

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserEntity savedUserEntity = modelMapper.map(userDTO, UserEntity.class);
        return userDAO.save(savedUserEntity);
    }

    @Override
    public UserDetailDTO getUserDetail(String userId) {
        
        UserEntity userEntity = userDAO.findByUserId(userId);

        if(userEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDetailEntity tempUserDetailEntity = userEntity.getUserDetail();

        UserDetailDTO returnValue = modelMapper.map(tempUserDetailEntity, UserDetailDTO.class);

        return returnValue;

    }

    @Override
    public UserDetailDTO updateUserDetail(UserDetailDTO userDetailDTO, MultipartFile picture) {

        ///Get user from the database with its user id.
        UserEntity userEntity = userDAO.findByUserId(userDetailDTO.getUserId());

        ///If user not found throw a exception.
        if (userEntity == null)
            throw new UsernameNotFoundException("User not found");

        ///Get userDetailEntity inside userEntity which we fetched from database.
        UserDetailEntity userDetailEntity = userEntity.getUserDetail();

        ///Send feign request to the AmazonS3Bucket microservice to upload the picture and get the url.
        String profilePictureUrl = amazonS3ServiceClient.getPictureUrl(picture);

        ///If AmazonS3Bucket microservice returns null.
        if(profilePictureUrl == null)
            return null;

        if(userDetailEntity.getProfilePicture() != null){
            Boolean isDeleted = amazonS3ServiceClient.deletePicture(userDetailEntity.getProfilePicture());

            if(!isDeleted)
                return null;
        }

        ///Update userDetailEntity with new data.
        userDetailEntity.setFullName(userDetailDTO.getFullName());
        userDetailEntity.setPhoneNumber(userDetailDTO.getPhoneNumber());
        userDetailEntity.setProfilePicture(profilePictureUrl);

        ///Update userDetailEntity inside userEntity.
        userEntity.setUserDetail(userDetailEntity);

        ///Save updated user to the database.
        UserEntity savedUserEntity = userDAO.save(userEntity);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        
        ///Return updated data to the controller as a response.
        return modelMapper.map(savedUserEntity.getUserDetail(), UserDetailDTO.class);
    }

    @Override
    public Boolean addOrDeleteFavorites(String userId, String advertId) {

        UserEntity userEntity = userDAO.findByUserId(userId);

        if (userEntity == null)
            return false;

        UserDetailEntity tempUserDetail = userEntity.getUserDetail();
        List<String> tempFavorites = tempUserDetail.getFavorites();

        if (tempFavorites.contains(advertId)) 
            tempFavorites.remove(advertId);
        else
            tempFavorites.add(advertId);

        tempUserDetail.setFavorites(tempFavorites);
        userEntity.setUserDetail(tempUserDetail);

        userDAO.save(userEntity);
    
        return true;
    }

}