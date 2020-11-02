package zuul.gateway.gateway.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private Environment environment;

    public WebSecurity(Environment environment){
        this.environment = environment;
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.authorizeRequests()
        .antMatchers(environment.getProperty("api.zuul.actuator.url.path")).permitAll()
        .antMatchers(environment.getProperty("api.users.actuator.url.path")).permitAll()
        .antMatchers(environment.getProperty("api.h2console.url.path")).permitAll()
        .antMatchers(HttpMethod.POST, environment.getProperty("api.registration.url.path")).permitAll()
        .antMatchers(HttpMethod.POST, environment.getProperty("api.login.url.path")).permitAll()
        .antMatchers(HttpMethod.POST, environment.getProperty("api.with.email.user.activation.url")).permitAll()
        .antMatchers(HttpMethod.GET, environment.getProperty("api.with.email.user.activation.url")).permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilter(new AuthorizationFilter(authenticationManager(), environment));
        
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}