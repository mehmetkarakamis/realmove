package project1.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project1.DTO.UserDTO;
import project1.DTO.UserDetailDTO;
import project1.amazon.AmazonClient;
import project1.model.User;
import project1.model.UserDetail;
import project1.service.IUserService;

import javax.validation.Valid;
import javax.validation.ValidationException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;


@Tag(name = "UserInfo", description = "API for userinfo")
@CrossOrigin
@RestController
public class UserController {


    @Autowired
    private IUserService IUserService;

    AmazonClient amazonClient;

    @Autowired
    public UserController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    //    private HashData hashData = new HashData();



    @Operation(summary = "Create a new user", description = "Create a new user with username , fullname and password", tags = { "userinfo" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(schema = @Schema(implementation = User.class))) })
    @PostMapping("/signup")
    public ResponseEntity<?> create(@Valid @RequestBody UserDTO userDTO) throws NoSuchAlgorithmException {

        if (IUserService.existsByEmail(userDTO.getEmail())){

            throw new ValidationException("Email already existed");


        }

        IUserService.register(userDTO);
        return new ResponseEntity<>( "User Registered Successfully ",HttpStatus.OK);
    }

    @GetMapping("/user/userDetails")
    public ResponseEntity<?> getUserDetails(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User tempUser = IUserService.findByEmail(((UserDetails)principal).getUsername());
        return  new ResponseEntity<>(tempUser,HttpStatus.OK);

    }
    public static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg","image/jpg");

    @PutMapping("/user/userDetails")
    public ResponseEntity<?> changeUserDetails(@Valid @ModelAttribute UserDetailDTO userDetailDTO, @RequestParam MultipartFile profilePicture){
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String imageType = profilePicture.getContentType(); //gets whether image jpg,png or gif.

        if (userDetailDTO.getEmail().equals(principal.getUsername())&& !profilePicture.isEmpty()&& contentTypes.contains(imageType)){
            User tempUser = IUserService.findByEmail(principal.getUsername());
            UserDetail tempUserDetail = tempUser.getUserDetail();

            if(tempUserDetail.getProfilePicture()!=null) {
                amazonClient.deleteFileFromS3Bucket(tempUserDetail.getProfilePicture());
            }
            tempUserDetail.setFullName(userDetailDTO.getFullName());
            tempUserDetail.setPhoneNumber(userDetailDTO.getPhoneNumber());
            tempUserDetail.setProfilePicture(amazonClient.uploadFile(profilePicture));

            tempUser.setUserDetail(tempUserDetail);

            IUserService.updateUser(tempUser);
            return new ResponseEntity<>("User Details Updated Successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot Update User Details Please Check Fields Again.", HttpStatus.OK);

    }


}
