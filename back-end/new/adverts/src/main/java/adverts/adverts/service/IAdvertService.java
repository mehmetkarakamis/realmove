package adverts.adverts.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import adverts.adverts.DTO.AdvertDTO;

public interface IAdvertService {
    
    AdvertDTO createAdvert(AdvertDTO advertDTO, MultipartFile[] pictures);
    AdvertDTO getAdvert(String advertId);
	AdvertDTO updateAdvert(AdvertDTO advertDTO, String advertId, MultipartFile[] pictures);
	Boolean deleteAdvert(String userId, String advertId, Boolean reject);
	List<AdvertDTO> getAdvertsByTitle(String title);
	List<AdvertDTO> getFavorites(List<String> advertIds);
	List<AdvertDTO> getAllAdverts();
	List<AdvertDTO> getNearLocationAdverts(Double lat1, Double lon1, Double lat2, Double lon2);
	List<AdvertDTO> getRejectedAdverts();
	Boolean approveAdvert(String advertId);
	
}
