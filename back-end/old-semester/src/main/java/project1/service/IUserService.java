package project1.service;

import org.springframework.stereotype.Repository;
import project1.DTO.UserDTO;
import project1.model.User;


@Repository
public interface IUserService{

    Boolean existsByEmail(String email);
    User findByEmail(String email);
    User register(UserDTO userDTO);
    void updateUser(User user);



}
