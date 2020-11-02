package project1.service;

import org.springframework.web.multipart.MultipartFile;
import project1.DTO.AdvertDTO;
import project1.model.Advert;

import java.util.List;

public interface IAdvertService {

    List<Advert> findAll();
    Advert create(AdvertDTO advertDTO, MultipartFile[] pictures);
    Advert update(Long id, Advert advert);
    Advert findById(Long id);
    void deleteById(Long id);
}
