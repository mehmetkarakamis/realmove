package user.users.DTO;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

public class MessageDTO implements Serializable {

    private static final long serialVersionUID = -2359765435612538065L;

    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String messageId;

    @Getter @Setter
    private String userId;

    @JsonIgnore
    @Getter @Setter
    private String fromUserId;

    @JsonIgnore
    @Getter @Setter
    private String toUserId;

    @Getter @Setter
    private String content;

    @JsonIgnore
    @Getter @Setter
    private String advertId;

    @Getter @Setter
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private Date dateTime;
}