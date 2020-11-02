package user.users.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;

public class UserDetailRequestModel {

    @Getter @Setter
    private String userId;
    
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9]+|[a-zA-Z0-9]+\\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\\s{1}[a-zA-Z0-9]{3,}\\s{1}[a-zA-Z0-9]{1,})$") //Can be maximum 3 spaced name ex -> Hello World Hello
    @Getter @Setter
    private String fullName;

    @NotBlank
    @Pattern(regexp = "[0-9]{11}")
    @Getter @Setter
    private String phoneNumber; //It should be only number and 11 character.
    
}
