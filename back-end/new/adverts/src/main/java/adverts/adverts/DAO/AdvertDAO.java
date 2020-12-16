package adverts.adverts.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import adverts.adverts.entity.AdvertEntity;

public interface AdvertDAO extends CrudRepository<AdvertEntity, Long> {

    AdvertEntity findByAdvertId(String advertId);
    List<AdvertEntity> findByTitleContaining(String title);
    List<AdvertEntity> findByAdvertIdIn(List<String> advertIds);

    @Query(
  value = "SELECT * FROM realmove.adverts where (latitude between :lat1 and :lat2 ) and (longitude between :lon1 and :lon2 );", 
  nativeQuery = true)
    List<AdvertEntity> findNearLocationAdvertEntities(Double lat1, Double lon1, Double lat2, Double lon2);

    @Query(
  value = "SELECT * FROM realmove.adverts where validate = 0;", 
  nativeQuery = true)
    List<AdvertEntity> getRejectedAdverts();
}

