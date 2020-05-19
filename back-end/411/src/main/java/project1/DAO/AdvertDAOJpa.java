package project1.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project1.model.Advert;

import java.util.List;

@Repository
public interface AdvertDAOJpa extends CrudRepository<Advert, Long> {

    List<Advert> findAll();

}
