package fi.tuni.tiko.helpdesk.blog.blog.security;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @GetMapping("/role")
    public Role getRole(Authentication auth) {

        if (auth.getName().equals("admin")) {
            return new Role(Role.Roles.ADMIN);
        }

        return new Role(Role.Roles.USER);
    }
}
