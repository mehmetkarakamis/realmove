package user.users.controller;

import org.springframework.web.bind.annotation.RestController;

import user.users.DAO.ConfirmationTokenDAO;
import user.users.DTO.ConversationDTO;
import user.users.DTO.MessageDTO;
import user.users.model.MessageRequestModel;
import user.users.model.ConversationResponseModel;
import user.users.service.IMessageService;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    
    @Autowired
    private Environment environment;

    @Autowired
    IMessageService messageService;

    @Autowired
    ConfirmationTokenDAO confirmationTokenDAO;

    public String getInformation(String token) {
        if(token == null)
            return null;

        System.out.println(environment.getProperty("authorization.token.header.prefix"));
        String myToken = token.replace(environment.getProperty("authorization.token.header.prefix"), "");
        String information = Jwts.parser().setSigningKey(environment.getProperty("token.secret")).parseClaimsJws(myToken)
                .getBody().getSubject();
        return information;
    }

    
    @GetMapping("/getConversationMessages")
    public ResponseEntity<ConversationResponseModel> getConversationMessages(
                                        @RequestHeader(name = "Authorization") String token,
                                        @RequestParam String conversationId) {

        if(conversationId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ConversationDTO tempConversation = messageService.getConversation(conversationId);

        if (tempConversation == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        ConversationResponseModel returnValue = modelMapper.map(tempConversation, ConversationResponseModel.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

    }

    @GetMapping("/getConversationList")
    public ResponseEntity<List<ConversationResponseModel>> getConversationList(
                                        @RequestHeader(name = "Authorization") String token,
                                        @RequestParam String userId) {

        if(userId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        List<ConversationDTO> tempMessageList = messageService.getConversationList(userId);

        if (tempMessageList == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<ConversationResponseModel> returnValue = new ArrayList<>();

        for (ConversationDTO tempConversationDTO : tempMessageList) {
            ConversationResponseModel tempResponse = modelMapper.map(tempConversationDTO, ConversationResponseModel.class);
            returnValue.add(tempResponse);
        }
        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

    }

    @PostMapping
    public ResponseEntity<ConversationResponseModel> sendMessage(@Valid @ModelAttribute MessageRequestModel messageRequestModel) {

        /// Created our modelMapper to map messageRequestModel to userDTO.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        MessageDTO messageDTO = modelMapper.map(messageRequestModel, MessageDTO.class);

        /// Send messageDTO to the userService to create our user into the database.
        ConversationDTO createdConversation = messageService.sendMessage(messageDTO);

        /// If createdUser is null return badRequest.
        if (createdConversation == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        /// Map userDTO to UserResponseModel.
        ConversationResponseModel returnValue = modelMapper.map(createdConversation, ConversationResponseModel.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteConversation(@RequestHeader(name = "Authorization") String token,
            @RequestParam String conversationId) {

        String userId = getInformation(token);

        if (conversationId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        Boolean returnValue = messageService.deleteConversation(conversationId, userId);

        if (returnValue == false)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

    }

}