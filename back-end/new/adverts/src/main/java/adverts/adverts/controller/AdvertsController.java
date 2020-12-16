package adverts.adverts.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import adverts.adverts.DTO.AdvertDTO;
import adverts.adverts.model.AdvertRequestModel;
import adverts.adverts.model.AdvertResponseModel;
import adverts.adverts.service.IAdvertService;
import io.jsonwebtoken.Jwts;

@RestController
@RequestMapping("/api/advert")
public class AdvertsController {

    @Autowired
    private Environment environment;

    @Autowired
    IAdvertService advertService;

    public String getInformation(String token) {
        if (token == null)
            return null;

        System.out.println(environment.getProperty("authorization.token.header.prefix"));
        String myToken = token.replace(environment.getProperty("authorization.token.header.prefix"), "");
        String information = Jwts.parser().setSigningKey(environment.getProperty("token.secret"))
                .parseClaimsJws(myToken).getBody().getSubject();
        return information;
    }

    @PostMapping
    public ResponseEntity<AdvertResponseModel> createAdvert(@ModelAttribute AdvertRequestModel advertRequestModel,
            @RequestPart MultipartFile[] advertPictures, @RequestHeader(name = "Authorization") String token) {

        String userId = getInformation(token);

        if (advertPictures == null || userId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        advertRequestModel.setUserId(userId);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        AdvertDTO advertDTO = modelMapper.map(advertRequestModel, AdvertDTO.class);

        AdvertDTO createdAdvert = advertService.createAdvert(advertDTO, advertPictures);

        if (createdAdvert == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        AdvertResponseModel returnValue = modelMapper.map(createdAdvert, AdvertResponseModel.class);
        returnValue.setRedirect("Inside AdvertsController.java");

        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);

    }

    @GetMapping
    public ResponseEntity<AdvertResponseModel> getAdvert(@RequestParam String advertId) {

        if (advertId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        AdvertDTO advertDTO = advertService.getAdvert(advertId);

        if (advertDTO == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        AdvertResponseModel returnValue = modelMapper.map(advertDTO, AdvertResponseModel.class);
        returnValue.setRedirect("Inside AdvertsController.java");

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/all")
        public ResponseEntity<List<AdvertResponseModel>> getAllAdverts(){

        List<AdvertDTO> allAdvertDTOs = advertService.getAllAdverts();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertResponseModel> returnValue = new ArrayList<>();

        if(allAdvertDTOs == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        for (AdvertDTO tempAdvertDTOs : allAdvertDTOs) {
            AdvertResponseModel tempResponse = modelMapper.map(tempAdvertDTOs, AdvertResponseModel.class);
            tempResponse.setRedirect("Inside AdvertsController.java");
            returnValue.add(tempResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);

        }
    

    @PatchMapping
    public ResponseEntity<AdvertResponseModel> updateAdvert(@ModelAttribute AdvertRequestModel advertRequestModel,
            @RequestParam String advertId, @RequestPart MultipartFile[] advertPictures,
            @RequestHeader(name = "Authorization") String token) {

        String userId = getInformation(token);

        if (advertPictures == null || userId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        advertRequestModel.setUserId(userId);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        AdvertDTO advertDTO = modelMapper.map(advertRequestModel, AdvertDTO.class);

        AdvertDTO updatedAdvert = advertService.updateAdvert(advertDTO, advertId, advertPictures);

        if (updatedAdvert == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        AdvertResponseModel returnValue = modelMapper.map(updatedAdvert, AdvertResponseModel.class);
        returnValue.setRedirect("Inside AdvertsController.java");

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteAdvert(@RequestHeader(name = "Authorization") String token,
            @RequestParam String advertId) {

        String userId = getInformation(token);

        if (userId == null || advertId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        Boolean returnValue = advertService.deleteAdvert(userId, advertId, false);

        if (returnValue == false)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/search/title")
    public ResponseEntity<List<AdvertResponseModel>> getAdvertsByTitle(@RequestParam String title) {

        if (title == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        List<AdvertDTO> advertDTOs = advertService.getAdvertsByTitle(title);

        if (advertDTOs == null)
            return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertResponseModel> returnValue = new ArrayList<>();

        for (AdvertDTO tempAdvertDTOs : advertDTOs) {
            AdvertResponseModel tempResponse = modelMapper.map(tempAdvertDTOs, AdvertResponseModel.class);
            returnValue.add(tempResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
    @GetMapping("/search/favorites")
    public ResponseEntity<List<AdvertResponseModel>> getFavorites(@RequestParam List<String> favorites) {

        if (favorites == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        List<AdvertDTO> advertDTOs = advertService.getFavorites(favorites);

        if (advertDTOs == null)
            return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertResponseModel> returnValue = new ArrayList<>();

        for (AdvertDTO tempAdvertDTOs : advertDTOs) {
            AdvertResponseModel tempResponse = modelMapper.map(tempAdvertDTOs, AdvertResponseModel.class);
            returnValue.add(tempResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
    @GetMapping("/search/near/locations")
    public ResponseEntity<List<AdvertResponseModel>> getNearLocationAdverts(@RequestParam Double latitude, @RequestParam Double longitude, @RequestParam Double range){

        Double lat1 = latitude - (range * 0.01);
        Double lon1 = longitude - (range * 0.01);
        Double lat2 = latitude + (range * 0.01);
        Double lon2 = longitude + (range * 0.01);

        System.out.println("lat1:"+ lat1 + " lon1:"+lon1+"lat2:"+ lat2 + " lon1:"+lon2);

        List<AdvertDTO> advertDTOs = advertService.getNearLocationAdverts(lat1,lon1,lat2,lon2);

        if (advertDTOs == null)
            return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertResponseModel> returnValue = new ArrayList<>();

        for (AdvertDTO tempAdvertDTOs : advertDTOs) {
            AdvertResponseModel tempResponse = modelMapper.map(tempAdvertDTOs, AdvertResponseModel.class);
            returnValue.add(tempResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/newAdverts")
    public ResponseEntity<List<AdvertResponseModel>> getRejectedAdverts(){

        List<AdvertDTO> allAdvertDTOs = advertService.getRejectedAdverts();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertResponseModel> returnValue = new ArrayList<>();

        if(allAdvertDTOs == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        for (AdvertDTO tempAdvertDTOs : allAdvertDTOs) {
            AdvertResponseModel tempResponse = modelMapper.map(tempAdvertDTOs, AdvertResponseModel.class);
            tempResponse.setRedirect("Inside AdvertsController.java");
            returnValue.add(tempResponse);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
    @GetMapping("/newAdverts/approve")
    public ResponseEntity<Boolean> approveAdvert(@RequestParam String advertId){

        if (advertId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        Boolean isTrue = advertService.approveAdvert(advertId);

        if(isTrue == false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    @DeleteMapping("/newAdverts/reject")
    public ResponseEntity<Boolean> rejectAdvert(@RequestHeader(name = "Authorization") String token,
            @RequestParam String advertId) {

        String userId = getInformation(token);

        if (userId == null || advertId == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        Boolean returnValue = advertService.deleteAdvert(userId, advertId, true);

        if (returnValue == false)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }
}
