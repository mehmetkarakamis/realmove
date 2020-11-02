package adverts.adverts.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import adverts.adverts.DTO.AdvertDTO;

public interface IAdvertService {
    
    AdvertDTO createAdvert(AdvertDTO advertDTO, MultipartFile[] pictures);
    AdvertDTO getAdvert(String advertId);
	AdvertDTO updateAdvert(AdvertDTO advertDTO, String advertId, MultipartFile[] pictures);
	Boolean deleteAdvert(String userId, String advertId);
	List<AdvertDTO> getAdvertsByTitle(String title);
	List<AdvertDTO> getFavorites(List<String> advertIds);
}
