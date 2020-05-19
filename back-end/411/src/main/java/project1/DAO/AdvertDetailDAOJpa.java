package project1.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import project1.model.AdvertDetail;

@Repository
public interface AdvertDetailDAOJpa extends CrudRepository<AdvertDetail,Long> {

}
