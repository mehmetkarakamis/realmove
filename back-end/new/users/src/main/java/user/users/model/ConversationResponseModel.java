package user.users.model;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import user.users.DTO.MessageDTO;

public class ConversationResponseModel {

    @Getter @Setter
    private String conversationId;

    @Getter @Setter
    private String fromUserId;

    @Getter @Setter
    private String toUserId;

    @Getter @Setter
    private String advertId;

    @Getter @Setter
    private List<MessageDTO> messageList;
}
