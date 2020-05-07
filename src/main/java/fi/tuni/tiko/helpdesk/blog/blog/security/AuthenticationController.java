package fi.tuni.tiko.helpdesk.blog.blog.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @GetMapping("/role")
    public Role getRole() {
        return new Role(Role.Roles.ADMIN);
    }

}
