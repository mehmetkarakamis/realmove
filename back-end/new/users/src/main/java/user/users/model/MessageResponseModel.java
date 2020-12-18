package user.users.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

public class MessageResponseModel {

    @Getter @Setter
    private String messageId;

    @Getter
    @Setter
    private Long fromUserId;

    @Getter
    @Setter
    private Long toUserId;

    @Getter
    @Setter
    private String content;

    @Getter
    @Setter
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date dateTime;
}
