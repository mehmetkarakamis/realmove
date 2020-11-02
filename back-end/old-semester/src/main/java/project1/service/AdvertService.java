package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project1.DAO.AdvertDAOJpa;
import project1.DTO.AdvertDTO;
import project1.amazon.AmazonClient;
import project1.controller.UserController;
import project1.model.Advert;
import project1.model.AdvertDetail;
import project1.model.AdvertPicture;
import project1.model.User;

import java.util.*;

@Service
public class AdvertService implements IAdvertService {

    @Autowired
    private AdvertDAOJpa advertDAOJpa;

    @Autowired
    AmazonClient amazonClient;

    @Autowired
    private IUserService IUserService;

    @Override
    public List<Advert> findAll() {
        return advertDAOJpa.findAll();
    }

    @Override
    public Advert findById(Long id) {
        return advertDAOJpa.findById(id).get();
    }

    @Override
    public Advert create(AdvertDTO advertDTO, MultipartFile[] pictures) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User tempUser = IUserService.findByEmail(((UserDetails)principal).getUsername());



        Advert advert = new Advert();

        advert.setTitle(advertDTO.getTitle());
        advert.setPrice(advertDTO.getPrice());
        advert.setDescription(advertDTO.getDescription());
        advert.setDate(new Date());
        advert.setAdvertType(advertDTO.getAdvertType());
        advert.setSquareMeter(advertDTO.getSquareMeter());
        advert.setResidentalType(advertDTO.getResidentalType());
        advert.setNumberOfRooms(advertDTO.getNumberOfRooms());
        advert.setFloorNumber(advertDTO.getFloorNumber());
        advert.setBuildingAge(advertDTO.getBuildingAge());
        advert.setHeatingType(advertDTO.getHeatingType());
        advert.setNumOfBuildingFloors(advert.getNumOfBuildingFloors());
        advert.setFurnitureStatus(advertDTO.getFurnitureStatus());
        advert.setNumOfBathrooms(advertDTO.getNumOfBathrooms());
        advert.setStatus(advertDTO.getStatus());
        advert.setStudentAndSinglePerson(advertDTO.getStudentAndSinglePerson());
        advert.setFront(advertDTO.getFront());
        advert.setOnTheSite(advertDTO.getOnTheSite());
        advert.setUser(tempUser);
        advertDAOJpa.save(advert);

        Set<AdvertDetail> tempDetails = new HashSet<>();

        for (int i = 0; i < advertDTO.getKeyword().size(); i++) {
            System.out.println("The value of i is: " + i);

            AdvertDetail advertDetail = new AdvertDetail();

            advertDetail.setKeyword(advertDTO.getKeyword().get(i));
            advertDetail.setType(advertDTO.getType().get(i));
            advertDetail.setAdvert(advert);

            tempDetails.add(advertDetail);
        }

        advert.setAdvertDetails(tempDetails);

        Set<AdvertPicture> tempPictures = new HashSet<>();
        for (int j = 0; j < pictures.length; j++) {

            String imageType = pictures[j].getContentType(); //gets whether image jpg,png or gif.

            if (UserController.contentTypes.contains(imageType)) {
                AdvertPicture advertPicture = new AdvertPicture();
                advertPicture.setPictureUrl(amazonClient.uploadFile(pictures[j]));
                advertPicture.setAdvert(advert);
                tempPictures.add(advertPicture);
            }


        }

        advert.setAdvertPictures(tempPictures);

        return advertDAOJpa.save(advert);
    }

    @Override
    public Advert update(Long id, Advert advert) {
        if(advertDAOJpa.findById(id).isPresent()) {
            Advert mainAdvert = advertDAOJpa.findById(id).get();
            mainAdvert.setTitle(advert.getTitle());
            mainAdvert.setPrice(advert.getPrice());
            mainAdvert.setDescription(advert.getDescription());
            mainAdvert.setAdvertType(advert.getAdvertType());
            mainAdvert.setSquareMeter(advert.getSquareMeter());
            mainAdvert.setResidentalType(advert.getResidentalType());
            mainAdvert.setNumberOfRooms(advert.getNumberOfRooms());
            mainAdvert.setFloorNumber(advert.getFloorNumber());
            mainAdvert.setBuildingAge(advert.getBuildingAge());
            mainAdvert.setHeatingType(advert.getHeatingType());
            mainAdvert.setNumOfBuildingFloors(advert.getNumOfBuildingFloors());
            mainAdvert.setFurnitureStatus(advert.getFurnitureStatus());
            mainAdvert.setNumOfBathrooms(advert.getNumOfBathrooms());
            mainAdvert.setStatus(advert.getStatus());
            mainAdvert.setStudentAndSinglePerson(advert.getStudentAndSinglePerson());
            mainAdvert.setFront(advert.getFront());
            mainAdvert.setOnTheSite(advert.getOnTheSite());
            mainAdvert.setAdvertDetails(advert.getAdvertDetails());



            return advertDAOJpa.save(mainAdvert);
        }else {
            return null;
        }
    }

    @Override
    public void deleteById(Long id) {
        advertDAOJpa.deleteById(id);
    }
}
