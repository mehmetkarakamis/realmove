package user.users.model;


import lombok.Getter;
import lombok.Setter;

public class UserResponseModel {

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String userId;

    @Getter @Setter
    private String redirect;
    
}