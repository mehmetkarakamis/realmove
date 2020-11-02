package project1.DTO;




import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class UserDetailDTO {


    @Email
    @NotBlank
    String email;

    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]+|[a-zA-Z0-9]+\\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\\s{1}[a-zA-Z0-9]{3,}\\s{1}[a-zA-Z0-9]{1,})$") //Can be maximum 3 spaced name ex -> Hello World Hello
    private String fullName;

    @Pattern(regexp = "[0-9]{11}")
    private String phoneNumber; //It should be only number and 11 character.


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}
