package user.users.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class UserDetailResponseModel {

    @Getter @Setter
    private String fullName;

    @Getter @Setter
    private String phoneNumber;

    @Getter @Setter
    private String profilePicture;

    @Getter @Setter
    private List<String> favorites;

    @Getter @Setter
    private String redirect;
    
}
