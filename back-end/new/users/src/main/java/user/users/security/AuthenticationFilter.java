package user.users.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import user.users.DTO.UserDTO;
import user.users.model.LoginRequestModel;
import user.users.service.IUserService;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private IUserService userService;
    private Environment enviroment;

    @Autowired
    public AuthenticationFilter(IUserService userService, Environment enviroment,
            AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
        this.userService = userService;
        this.enviroment = enviroment;

    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        try {
            LoginRequestModel creds = new ObjectMapper().readValue(request.getInputStream(), LoginRequestModel.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(), new ArrayList<>()));

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        System.out.println(((User) authResult.getPrincipal()));
        String email = ((User) authResult.getPrincipal()).getUsername();

        UserDTO userDTO = userService.getUserByEmail(email);
        userDTO.setRedirect("Inside AuthenticationFilter.java");

        String token = Jwts.builder().setSubject(userDTO.getUserId())
                .setExpiration(new Date(
                        System.currentTimeMillis() + Long.parseLong(enviroment.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, enviroment.getProperty("token.secret")).compact();

        /// Send informations through response header.
        /// response.addHeader("token", token);
        /// response.addHeader("userId", userDTO.getUserId());
        /// response.addHeader("redirect", userDTO.getRedirect());

        /// Send informations as a response body.
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"token\":\"" + token + "\",\"userId\":\"" + userDTO.getUserId()
                + "\",\"redirect\":\"" + userDTO.getRedirect() + "\"}");
    }
}