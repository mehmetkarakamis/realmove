package user.users.service;

import java.util.List;

import user.users.DTO.ConversationDTO;
import user.users.DTO.MessageDTO;

public interface IMessageService {
    /*
    MessageDTO sendMessage(MessageDTO messageDTO);
    List<MessageDTO> getMessageList(String toUserId);
    */

	ConversationDTO getConversation(String conversationId);
	List<ConversationDTO> getConversationList(String userId);
    Boolean deleteConversation(String conversationId, String userId);
    ConversationDTO sendMessage(MessageDTO messageDTO);
}
