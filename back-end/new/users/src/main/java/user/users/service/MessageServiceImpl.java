package user.users.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import user.users.DAO.MessageDAO;
import user.users.DTO.MessageDTO;
import user.users.entity.MessageEntity;

public class MessageServiceImpl implements IMessageService {

    private MessageDAO messageDAO;

    @Override
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        
        messageDTO.setId(UUID.randomUUID().toString());

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        
        MessageEntity messageEntity = modelMapper.map(messageDTO, MessageEntity.class);

        messageDAO.save(messageEntity);

        /// Created our returnValue to sent it to the frontend.
        MessageDTO returnValue = modelMapper.map(messageEntity, MessageDTO.class);

        /// Sent returnValue to the UserController.
        return returnValue;

        return null;
    }

    @Override
    public List<MessageDTO> getMessages(String toUserId) {
        List<MessageEntity> messageEntity = messageDAO.findByAdvertId(toUserId);

        if(messageEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageDTO> returnValue = modelMapper.map(messageEntity, List<MessageDTO>().class);

        return returnValue;
    }

    @Override
    public List<MessageDTO> getMessageList(String toUserId) {
        List<MessageEntity> messageEntity = messageDAO.findByToUserId(toUserId);

        if(messageEntity == null)
            return null;
        
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageDTO> returnValue = modelMapper.map(messageEntity, List<MessageDTO>().class);

        return returnValue;
    }

    

}
