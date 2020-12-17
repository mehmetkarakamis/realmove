package user.users.DTO;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

public class MessageDTO implements Serializable {

    private static final long serialVersionUID = -2359765435612538065L;

    @Getter
    @Setter
    private Long id;

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