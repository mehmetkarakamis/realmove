package user.users.controller;

import org.springframework.web.bind.annotation.RestController;

import user.users.DAO.ConfirmationTokenDAO;
import user.users.DTO.MessageDTO;
import user.users.model.MessageRequestModel;
import user.users.model.MessageResponseModel;
import user.users.service.IMessageService;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
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
    IMessageService messageService;

    @Autowired
    ConfirmationTokenDAO confirmationTokenDAO;

    
    @GetMapping("/getUserMessageList")
    public ResponseEntity<List<MessageResponseModel>> getUserMessageList(@RequestHeader(name = "Authorization") String token,
                                        @RequestParam String toUserId) {

        if(toUserId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        List<MessageDTO> tempMessageList = messageService.getMessageList(toUserId);

        if (tempMessageList == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageResponseModel> returnValue = new ArrayList<>();

        for (MessageDTO tempMessageDTO : tempMessageList) {
            MessageResponseModel tempResponse = modelMapper.map(tempMessageDTO, MessageResponseModel.class);
            returnValue.add(tempResponse);
        }
        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

    }

    @GetMapping("/getAdvertMessages")
    public ResponseEntity<List<MessageResponseModel>> getAdvertMessages(@RequestHeader(name = "Authorization") String token,
                                        @RequestParam String toUserId, @RequestParam String advertId) {

        if(toUserId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        List<MessageDTO> tempMessageList = messageService.getMessages(toUserId);

        if (tempMessageList == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<MessageResponseModel> returnValue = new ArrayList<>();

        for (MessageDTO tempMessageDTO : tempMessageList) {
            MessageResponseModel tempResponse = modelMapper.map(tempMessageDTO, MessageResponseModel.class);
            returnValue.add(tempResponse);
        }
        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

    }

    @PostMapping
    public ResponseEntity<MessageResponseModel> createUser(@Valid @ModelAttribute MessageRequestModel messageRequestModel) {

        /// Created our modelMapper to map messageRequestModel to userDTO.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        MessageDTO messageDTO = modelMapper.map(messageRequestModel, MessageDTO.class);

        /// Send messageDTO to the userService to create our user into the database.
        MessageDTO createdMessage = messageService.sendMessage(messageDTO);

        /// If createdUser is null return badRequest.
        if (createdMessage == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        /// Map userDTO to UserResponseModel.
        MessageResponseModel returnValue = modelMapper.map(createdMessage, MessageResponseModel.class);
        returnValue.setRedirect("Inside MessageController.java");

        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteAdvert(@RequestHeader(name = "Authorization") String token,
            @RequestParam String messageId) {

        if (messageId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        Boolean returnValue = messageService.deleteMessage(messageId);

        if (returnValue == false)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

}