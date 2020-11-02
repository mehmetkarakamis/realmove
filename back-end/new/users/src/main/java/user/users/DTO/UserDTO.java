package user.users.DTO;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import user.users.entity.RoleEntity;

public class UserDTO implements Serializable{

    private static final long serialVersionUID = -2359765339212538065L;

    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String email;
    
    @Getter @Setter
    private String password;

    @Getter @Setter
    private String passwordRepeat;

    @Getter @Setter
    private String userId;

    @Getter @Setter
    private String encryptedPassword;

    @Getter @Setter
    private boolean isEnabled;

    @Getter @Setter
    private Set<RoleEntity> roles;

    @Getter @Setter
    private List<String> favorites;

    @Getter @Setter
    private String redirect;

  
}