package adverts.adverts.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import adverts.adverts.DAO.AdvertDAO;
import adverts.adverts.DTO.AdvertDTO;
import adverts.adverts.entity.AdvertEntity;
import adverts.adverts.feign.AmazonS3ServiceClient;

@Service
public class AdvertServiceImpl implements IAdvertService {

    private AdvertDAO advertDAO;
    private AmazonS3ServiceClient amazonS3ServiceClient;

    @Autowired
    public AdvertServiceImpl(AdvertDAO advertDAO, AmazonS3ServiceClient amazonS3ServiceClient) {
        this.advertDAO = advertDAO;
        this.amazonS3ServiceClient = amazonS3ServiceClient;
    }

    @Override
    public AdvertDTO getAdvert(String advertId) {

        AdvertEntity advertEntity = advertDAO.findByAdvertId(advertId);

        if (advertEntity == null)
            return null;

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        AdvertDTO returnValue = modelMapper.map(advertEntity, AdvertDTO.class);

        return returnValue;
    }

    @Override
    public AdvertDTO createAdvert(AdvertDTO advertDTO, MultipartFile[] pictures) {

        advertDTO.setAdvertId(UUID.randomUUID().toString());

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<String> urls = amazonS3ServiceClient.getPictureUrls(pictures);

        if (urls == null)
            return null;

        advertDTO.setAdvertPictures(urls);

        AdvertEntity advertEntity = modelMapper.map(advertDTO, AdvertEntity.class);

        System.out.println("test -> " + advertEntity.toString());

        advertEntity.setValidate(false);
        AdvertEntity savedAdvertEntity = advertDAO.save(advertEntity);

        if (savedAdvertEntity == null)
            return null;

        AdvertDTO returnValue = modelMapper.map(savedAdvertEntity, AdvertDTO.class);

        return returnValue;
    }

    @Override
    public AdvertDTO updateAdvert(AdvertDTO advertDTO, String advertId, MultipartFile[] pictures) {

        AdvertEntity advertEntity = advertDAO.findByAdvertId(advertId);

        if (advertEntity == null)
            return null;

        if (!(advertDTO.getUserId().equals(advertEntity.getUserId())))
            return null;

        advertDTO.setId(advertEntity.getId());
        advertDTO.setAdvertId(advertEntity.getAdvertId());

        if (advertEntity.getAdvertPictures() != null) {

            Boolean isDeleted = amazonS3ServiceClient.deletePictures(advertEntity.getAdvertPictures());

            if (!isDeleted)
                return null;
        }

        List<String> urls = amazonS3ServiceClient.getPictureUrls(pictures);

        if (urls == null)
            return null;

        advertDTO.setAdvertPictures(urls);

        /// Create model mapper to create our UserEntity.
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        AdvertEntity updatedAdvertEntity = modelMapper.map(advertDTO, AdvertEntity.class);

        AdvertEntity returnedAdvertEntity = advertDAO.save(updatedAdvertEntity);

        AdvertDTO returnValue = modelMapper.map(returnedAdvertEntity, AdvertDTO.class);

        return returnValue;
    }

    @Override
    public Boolean deleteAdvert(String userId, String advertId, Boolean reject) {

        AdvertEntity advertEntity = advertDAO.findByAdvertId(advertId);

        if (advertEntity == null)
            return false;

        if (!reject) {
            if (!(userId.equals(advertEntity.getUserId())))
                return false;
        }

        Boolean isDeleted = amazonS3ServiceClient.deletePictures(advertEntity.getAdvertPictures());

        if (!isDeleted)
            return false;

        advertDAO.delete(advertEntity);

        return true;
    }

    @Override
    public List<AdvertDTO> getAdvertsByTitle(String title) {

        List<AdvertEntity> advertEntities = advertDAO.findByTitleContaining(title);

        if (advertEntities == null)
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertDTO> returnValue = new ArrayList<>();

        for (AdvertEntity advertEntity : advertEntities) {
            if (advertEntity.getValidate()) {
                AdvertDTO tempAdvertDTO = modelMapper.map(advertEntity, AdvertDTO.class);
                returnValue.add(tempAdvertDTO);
            }
        }

        return returnValue;
    }

    @Override
    public List<AdvertDTO> getFavorites(List<String> advertIds) {

        List<AdvertEntity> advertEntities = advertDAO.findByAdvertIdIn(advertIds);

        if (advertEntities == null)
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertDTO> returnValue = new ArrayList<>();

        for (AdvertEntity advertEntity : advertEntities) {
            if (advertEntity.getValidate()) {
                AdvertDTO tempAdvertDTO = modelMapper.map(advertEntity, AdvertDTO.class);
                returnValue.add(tempAdvertDTO);
            }
        }

        return returnValue;

    }

    @Override
    public List<AdvertDTO> getAllAdverts() {

        List<AdvertEntity> allAdvertEntities = new ArrayList<>();
        advertDAO.findAll().forEach(allAdvertEntities::add);

        if (allAdvertEntities.isEmpty())
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertDTO> returnValue = new ArrayList<>();

        for (AdvertEntity advertEntity : allAdvertEntities) {
            if (advertEntity.getValidate()) {
                AdvertDTO tempAdvertDTO = modelMapper.map(advertEntity, AdvertDTO.class);
                returnValue.add(tempAdvertDTO);
            }
        }

        return returnValue;

    }

    @Override
    public List<AdvertDTO> getNearLocationAdverts(Double lat1, Double lon1, Double lat2, Double lon2) {

        List<AdvertEntity> allAdvertEntities = advertDAO.findNearLocationAdvertEntities(lat1, lon1, lat2, lon2);

        if (allAdvertEntities.isEmpty())
            return null;

        System.out.println("lat1:" + lat1 + " lon1:" + lon1 + "lat2:" + lat2 + " lon1:" + lon2);
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertDTO> returnValue = new ArrayList<>();

        for (AdvertEntity advertEntity : allAdvertEntities) {
            if (advertEntity.getValidate()) {
                AdvertDTO tempAdvertDTO = modelMapper.map(advertEntity, AdvertDTO.class);
                returnValue.add(tempAdvertDTO);
            }
        }
        return returnValue;
    }

    @Override
    public List<AdvertDTO> getRejectedAdverts() {

        List<AdvertEntity> allAdvertEntities = advertDAO.getRejectedAdverts();

        if (allAdvertEntities.isEmpty())
            return null;

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        List<AdvertDTO> returnValue = new ArrayList<>();

        for (AdvertEntity advertEntity : allAdvertEntities) {
            AdvertDTO tempAdvertDTO = modelMapper.map(advertEntity, AdvertDTO.class);
            returnValue.add(tempAdvertDTO);
        }
        return returnValue;
    }

    @Override
    public Boolean approveAdvert(String advertId) {
        AdvertEntity advertEntity = advertDAO.findByAdvertId(advertId);

        if (advertEntity == null)
            return false;

        advertEntity.setValidate(true);
        advertDAO.save(advertEntity);
        return true;

    }

}
