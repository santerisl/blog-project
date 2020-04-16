package fi.tuni.tiko.helpdesk.blog.blog.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {

    @Autowired
    private LoginAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("ad2").password(passwordEncoder().encode("admin"))
                .authorities("ROLE_ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
//                .antMatchers("/", "/api/**").permitAll()
//                .antMatchers("/login").authenticated()
                .anyRequest().authenticated()
                .and()
            .httpBasic()
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
//            .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
            .csrf().disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
