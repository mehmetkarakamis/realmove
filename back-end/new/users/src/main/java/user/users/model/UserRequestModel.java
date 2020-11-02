package user.users.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;
import user.users.validator.PasswordsEqualConstraint;

@PasswordsEqualConstraint()
public class UserRequestModel {
    
    @Email @NotNull(message = "Email cannot be null") @Getter @Setter
    private String email;
    
    @NotNull(message = "Password cannot be null") @Getter @Setter
    @Pattern(regexp = "^\\S{3,}$") //Should contains 1 lower case letter, 1 number and min 8 character.
    private String password;

    @NotNull(message = "Password cannot be null") @Getter @Setter
    @Pattern(regexp = "^\\S{3,}$") //Should contains 1 lower case letter, 1 number and min 8 character.
    private String passwordRepeat;

}