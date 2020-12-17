package user.users.model;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

public class MessageRequestModel {

    @NotBlank
    @Getter @Setter
    private Long fromUserId;
    
    @NotBlank
    @Getter @Setter
    private Long toUserId;

    @NotBlank
    @Getter @Setter
    private String content;

    @NotBlank
    @Getter @Setter
    private Long advertId;
    
}
