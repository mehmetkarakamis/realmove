package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project1.DAO.AdvertDAOJpa;
import project1.DAO.AdvertDetailDAOJpa;
import project1.DAO.UserDAOJpa;
import project1.DTO.AdvertDTO;
import project1.model.Advert;
import project1.model.AdvertDetail;
import project1.model.AdvertPicture;
import project1.model.User;
import project1.service.IUserService;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class test {


    private final PasswordEncoder userPasswordEncoder;
    private UserDAOJpa userDAOJpa;
    private AdvertDAOJpa advertDAOJpa;
    private AdvertDetailDAOJpa advertDetailDAOJpa;

    @Autowired
    public test(PasswordEncoder userPasswordEncoder, UserDAOJpa userDAOJpa, AdvertDAOJpa advertDAOJpa, AdvertDetailDAOJpa advertDetailDAOJpa) {
        this.userPasswordEncoder = userPasswordEncoder;
        this.userDAOJpa = userDAOJpa;
        this.advertDAOJpa = advertDAOJpa;
        this.advertDetailDAOJpa = advertDetailDAOJpa;
    }

    @Autowired
    private IUserService IUserService;

    @PostMapping("/test")
    public ResponseEntity<?> test(@ModelAttribute AdvertDTO advertDTO, @RequestParam MultipartFile[] pictures){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User tempUser = IUserService.findByEmail(((UserDetails)principal).getUsername());

        Advert advert = new Advert();

        advert.setTitle(advertDTO.getTitle());
        advert.setPrice(advertDTO.getPrice());
        advert.setFloorNumber(advertDTO.getFloorNumber());

        advert.setUser(tempUser);
        advertDAOJpa.save(advert);

        AdvertDetail advertDetail = new AdvertDetail();
        AdvertDetail advertDetail12 = new AdvertDetail();

        advertDetail.setKeyword(advertDTO.getKeyword().get(0));
        advertDetail.setType(advertDTO.getType().get(0));
        advertDetail.setAdvert(advert);

        advertDetail12.setKeyword(advertDTO.getKeyword().get(1));
        advertDetail12.setType(advertDTO.getType().get(1));
        advertDetail12.setAdvert(advert);

        Set<AdvertDetail> tempDetails = new HashSet<>();
        tempDetails.add(advertDetail);
        tempDetails.add(advertDetail12);

        advert.setAdvertDetails(tempDetails);

        AdvertPicture advertPicture = new AdvertPicture();
        advertPicture.setPictureUrl(pictures[0].getOriginalFilename());
        advertPicture.setAdvert(advert);

        Set<AdvertPicture> tempPictures = new HashSet<>();
        tempPictures.add(advertPicture);

        advert.setAdvertPictures(tempPictures);


        advertDAOJpa.save(advert);









        return  new ResponseEntity<>(advert,HttpStatus.OK);
    }
}
