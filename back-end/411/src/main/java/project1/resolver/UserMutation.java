package project1.resolver;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project1.DTO.UserDTO;
import project1.config.JwtToken;
import project1.model.JwtResponse;
import project1.model.User;
import project1.model.mutation.AuthenticateUserInfo;
import project1.model.mutation.CreateUserInfo;
import project1.service.IUserService;
import project1.service.JwtUserDetailsService;

import javax.validation.ValidationException;


@Component
@AllArgsConstructor
public class UserMutation {

    private IUserService IUserService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Transactional
    public Boolean createUserInfo(CreateUserInfo input){
        String username = input.getUsername();
        if (IUserService.existsByEmail(username)){

            throw new ValidationException("Username already existed");

        }
        String password = input.getPassword();
        String encodedPassword = new BCryptPasswordEncoder().encode(password);
//        String hashedPassword = hashData.get_SHA_512_SecurePassword(password);
        String fullname = input.getFullname();
       // IUserService.register(new UserDTO(username, encodedPassword,encodedPassword));
        return true;
    }

    @Transactional
    public JwtResponse authenticateUserInfo(AuthenticateUserInfo authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getEmail(),authenticationRequest.getPassword());

        final UserDetails userDetails = jwtUserDetailsService

                .loadUserByUsername(authenticationRequest.getEmail());

        final String token = jwtToken.generateToken(userDetails);

        return new JwtResponse(token);
    }

    private void authenticate(String username, String password) throws Exception {

        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        } catch (DisabledException e) {

            throw new Exception("USER_DISABLED", e);

        } catch (BadCredentialsException e) {

            throw new Exception("INVALID_CREDENTIALS", e);

        }

    }



}
