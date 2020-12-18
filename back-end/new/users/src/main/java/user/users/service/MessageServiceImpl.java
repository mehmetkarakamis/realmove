package user.users.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import user.users.DAO.MessageDAO;
import user.users.DTO.MessageDTO;
import user.users.entity.MessageEntity;

@Service
public class MessageServiceImpl implements IMessageService {

    private MessageDAO messageDAO;

    @Autowired
    public MessageServiceImpl(MessageDAO messageDAO){
        this.messageDAO = messageDAO;
    }

    @Override
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        
        messageDTO.setMessageId(UUID.randomUUID().toString());

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        
        MessageEntity messageEntity = modelMapper.map(messageDTO, MessageEntity.class);

        messageDAO.save(messageEntity);

        /// Created our returnValue to sent it to the frontend.
        MessageDTO returnValue = modelMapper.map(messageEntity, MessageDTO.class);

        /// Sent returnValue to the UserController.
        return returnValue;

    }

    @Override
    public List<MessageDTO> getMessages(String toUserId) {
        List<MessageEntity> messageEntity = messageDAO.findByAdvertId(toUserId);

        if(messageEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageDTO> returnValue = new ArrayList<>();

        for (MessageEntity tempMessageEntity : messageEntity) {
            MessageDTO tempResponse = modelMapper.map(tempMessageEntity, MessageDTO.class);
            returnValue.add(tempResponse);
        }
        return returnValue;
    }

    @Override
    public List<MessageDTO> getMessageList(String toUserId) {
        List<MessageEntity> messageEntity = messageDAO.findByToUserId(toUserId);

        if(messageEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageDTO> returnValue = new ArrayList<>();

        for (MessageEntity tempMessageEntity : messageEntity) {
            MessageDTO tempResponse = modelMapper.map(tempMessageEntity, MessageDTO.class);
            returnValue.add(tempResponse);
        }
        return returnValue;
    }

    

}
