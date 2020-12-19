package user.users.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import user.users.DAO.MessageDAO;
import user.users.DTO.ConversationDTO;
import user.users.DTO.MessageDTO;
import user.users.entity.ConversationEntity;
import user.users.entity.MessageEntity;

@Service
public class MessageServiceImpl implements IMessageService {

    private MessageDAO messageDAO;

    @Autowired
    public MessageServiceImpl(MessageDAO messageDAO) {
        this.messageDAO = messageDAO;
    }

    @Override
    public ConversationDTO sendMessage(MessageDTO messageDTO){

        messageDTO.setMessageId(UUID.randomUUID().toString());
        messageDTO.setDateTime(new Date());

         /// Create model mapper to create our UserEntity.
         ModelMapper modelMapper = new ModelMapper();
         modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ConversationEntity conversation = messageDAO.findByToUserIdAndFromUserIdAndAdvertId(messageDTO.getToUserId(), messageDTO.getFromUserId(), messageDTO.getAdvertId());

        if(conversation == null){
            conversation = messageDAO.findByToUserIdAndFromUserIdAndAdvertId(messageDTO.getFromUserId(), messageDTO.getToUserId(), messageDTO.getAdvertId());
            if(conversation == null){
                conversation = modelMapper.map(messageDTO, ConversationEntity.class);
                conversation.setConversationId(UUID.randomUUID().toString());
                conversation.setMessageList(new ArrayList<>());

                conversation = messageDAO.save(conversation);
            }
        }

        MessageEntity messageEntity = modelMapper.map(messageDTO, MessageEntity.class);
        messageEntity.setMessageId(UUID.randomUUID().toString());
        messageEntity.setUserId(messageDTO.getFromUserId());
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss"); 
        try {
            String str = format.format(new Date());
            Date date = format.parse(str);
            messageEntity.setDateTime(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        messageEntity.setConversation(conversation);
        
        conversation.getMessageList().add(messageEntity);
        /*
        List<MessageEntity> tempMessages = conversation.getMessageList();
        tempMessages.add(messageEntity);
        conversation.setMessageList(tempMessages);
        */
        
        ConversationEntity savedConversation = messageDAO.save(conversation);

        List<MessageDTO> messageListDTO = new ArrayList<>();

        for(MessageEntity tempMessageEntity: savedConversation.getMessageList()){
            MessageDTO tempMessageDTO = modelMapper.map(tempMessageEntity, MessageDTO.class);
            messageListDTO.add(tempMessageDTO);
        }
        /// Created our returnValue to sent it to the frontend.
        ConversationDTO returnValue = modelMapper.map(savedConversation, ConversationDTO.class);
        returnValue.setMessageList(messageListDTO);

        /// Sent returnValue to the UserController.
        return returnValue;

    }

    @Override
    public ConversationDTO getConversation(String conversationId) {

        ConversationEntity conversationEntity = messageDAO.findByConversationId(conversationId);

        if (conversationEntity == null)
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ConversationDTO returnValue = modelMapper.map(conversationEntity, ConversationDTO.class);

        return returnValue;
    }

    @Override
    public List<ConversationDTO> getConversationList(String userId) {

        List<ConversationEntity> conversationEntity = messageDAO.findByToUserIdOrFromUserId(userId, userId);

        if (conversationEntity == null)
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<ConversationDTO> returnValue = new ArrayList<>();

        for (ConversationEntity tempConversationEntity : conversationEntity) {
            ConversationDTO tempResponse = modelMapper.map(tempConversationEntity, ConversationDTO.class);
            returnValue.add(tempResponse);
        }
        return returnValue;
    }

    @Override
    public Boolean deleteConversation(String conversationId, String userId) {

        ConversationEntity conversationEntity = messageDAO.findByConversationId(conversationId);

        if (conversationEntity == null)
            return false;

        if (!(userId.equals(conversationEntity.getToUserId())))
            return false;

        messageDAO.delete(conversationEntity);

        return true;
    }

}
