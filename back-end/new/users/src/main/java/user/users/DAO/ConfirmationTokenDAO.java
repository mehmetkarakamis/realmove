package user.users.DAO;

import org.springframework.data.repository.CrudRepository;

import user.users.entity.ConfirmationTokenEntity;

public interface ConfirmationTokenDAO extends CrudRepository<ConfirmationTokenEntity, String> {
    ConfirmationTokenEntity findByConfirmationToken(String confirmationToken);
}