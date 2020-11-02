package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project1.DAO.UserDAOJpa;
import project1.DTO.UserDTO;
import project1.model.User;
import project1.model.UserDetail;

@Service
public class UserServiceImpl implements IUserService{


    private final PasswordEncoder userPasswordEncoder;
    private UserDAOJpa userDAOJpa;

    @Autowired
    public UserServiceImpl(PasswordEncoder userPasswordEncoder, UserDAOJpa userDAOJpa) {
        this.userPasswordEncoder = userPasswordEncoder;
        this.userDAOJpa = userDAOJpa;
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userDAOJpa.existsUserByEmail(email);
    }

    @Override
    public User findByEmail(String email) {
        return userDAOJpa.findByEmail(email);
    }

    @Override
    public User register(UserDTO userDTO) {
        User user = new User();

        user.setEmail(userDTO.getEmail());
        user.setPassword(userPasswordEncoder.encode(userDTO.getPassword()));

        UserDetail userDetail = new UserDetail();
        userDetail.setType("USER");
        user.setUserDetail(userDetail);

        userDAOJpa.save(user);

        return user;
    }

    @Override
    public void updateUser(User user) {
        userDAOJpa.save(user);
    }
}
