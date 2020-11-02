package project1.model;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project1.service.IUserService;

import java.util.Arrays;
import java.util.List;

/*
    This service is meant to be used by Spring Security.
    It has no direct relationship with user_details table.
 */

@Service
@Qualifier("userSecurityService")
public class UserDetailsServiceImpl implements UserDetailsService {


    @Qualifier("userServiceImpl")
    @Autowired
    private IUserService userService;


    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                true, true, true, true, getAuthority(user));


    }

    private List<SimpleGrantedAuthority> getAuthority(User user) {
        if(user.getUserDetail().getType().equals("ADMIN")){
            return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else{
            return Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
        }

    }

}