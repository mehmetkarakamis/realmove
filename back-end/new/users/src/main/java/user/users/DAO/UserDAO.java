package user.users.DAO;

import org.springframework.data.repository.CrudRepository;

import user.users.entity.UserEntity;

public interface UserDAO extends CrudRepository<UserEntity, Long> {

    UserEntity findByEmail(String email);
    UserEntity findByUserId(String userId);
    
}