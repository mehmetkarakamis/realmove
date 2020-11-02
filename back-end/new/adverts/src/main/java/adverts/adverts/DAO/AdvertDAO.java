package adverts.adverts.DAO;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import adverts.adverts.entity.AdvertEntity;

public interface AdvertDAO extends CrudRepository<AdvertEntity, Long> {

    AdvertEntity findByAdvertId(String advertId);
    List<AdvertEntity> findByTitleContaining(String title);
    List<AdvertEntity> findByAdvertIdIn(List<String> advertIds);
}
