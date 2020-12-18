package user.users.service;

import java.util.List;

import user.users.DTO.MessageDTO;

public interface IMessageService {
    // send message
    MessageDTO sendMessage(MessageDTO messageDTO);
    // get spesific advert messages
    List<MessageDTO> getMessages(String toUserId);
    // get one user's message list (from all adverts)
    List<MessageDTO> getMessageList(String toUserId);
    // Delete message
    Boolean deleteMessage(String messageId, String toUserId);
}
