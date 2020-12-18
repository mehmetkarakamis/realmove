package user.users.controller;

import org.springframework.web.bind.annotation.RestController;

import user.users.DAO.ConfirmationTokenDAO;
import user.users.DTO.MessageDTO;
import user.users.model.MessageResponseModel;
import user.users.service.IMessageService;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

    // TODO: POST mapping yapılacak

    // TODO: DELETE mesaj yapılacak

}