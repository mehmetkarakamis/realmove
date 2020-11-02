package project1.DTO;

import project1.validator.PasswordsEqualConstraint;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@PasswordsEqualConstraint()
public class UserDTO {

    @Email
    @NotBlank
    private String email;

    @NotNull
    @NotBlank
    @Pattern(regexp = "^\\S{3,}$") //Should contains 1 lower case letter, 1 number and min 8 character.
    private String password;

    @Pattern(regexp = "^\\S{3,}$") //Should contains 1 lower case letter, 1 number and min 8 character.
    @NotNull
    @NotBlank
    private String passwordRepeat;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    public void setPasswordRepeat(String passwordRepeat) {
        this.passwordRepeat = passwordRepeat;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", passwordRepeat='" + passwordRepeat + '\'' +
                '}';
    }
}
