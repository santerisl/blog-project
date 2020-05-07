package fi.tuni.tiko.helpdesk.blog.blog.security;

public class Role {

    public enum Roles {
        ADMIN,
        USER
    }

    private Roles role;

    public Role(Roles role) {
        this.role = role;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }
}
