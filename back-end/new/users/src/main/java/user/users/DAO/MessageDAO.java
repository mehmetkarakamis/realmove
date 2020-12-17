package user.users.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import user.users.entity.MessageEntity;

public interface MessageDAO extends CrudRepository<MessageEntity, Long> {
    
    List<MessageEntity> findByToUserId(String toUserId);
    List<MessageEntity> findByFromUserId(String fromUserId);
    List<MessageEntity> findByAdvertId(String advertId);

}
