package project1.DAO;

import org.springframework.data.repository.CrudRepository;
import project1.model.User;

public interface UserDAOJpa extends CrudRepository<User, Long> {

     Boolean existsUserByEmail(String email);
     User findByEmail(String email);
}
