package user.users.DTO;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class UserDetailDTO implements Serializable {

    private static final long serialVersionUID = 7454324605031953300L;

    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String userId;

    @Getter @Setter
    private String fullName;

    @Getter @Setter
    private String phoneNumber;

    @Getter @Setter
    private String profilePicture;

    @Getter @Setter
    private List<String> favorites;

    
}
