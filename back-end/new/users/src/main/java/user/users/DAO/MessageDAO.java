package user.users.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import user.users.entity.ConversationEntity;
import user.users.entity.MessageEntity;

public interface MessageDAO extends CrudRepository<ConversationEntity, Long> {
    
    
    //List<MessageEntity> findByFromUserId(String fromUserId);
    List<MessageEntity> findByAdvertId(String advertId);

    ConversationEntity findByConversationId(String conversationId);
    List<ConversationEntity> findByToUserIdOrFromUserId(String toUserId, String fromUserId);
    ConversationEntity findByToUserIdAndFromUserIdAndAdvertId(String toUserId, String fromUserId, String advertId);

}
