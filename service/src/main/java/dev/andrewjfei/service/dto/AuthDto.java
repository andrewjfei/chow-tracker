package dev.andrewjfei.service.dto;

public record AuthDto(
        String username,
        String email,
        String password
) {

    @Override
    public String username() {
        return username;
    }

    @Override
    public String email() {
        return email;
    }

    @Override
    public String password() {
        return password;
    }

    public boolean hasMissingFields() {
        if ((username == null && email == null) || password == null) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return "AuthRequestDTO{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
