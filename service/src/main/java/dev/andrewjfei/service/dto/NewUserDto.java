package dev.andrewjfei.service.dto;

public record NewUserDto(
        String username,
        String firstName,
        String lastName,
        String email,
        String password,
        String confirmedPassword
) implements BaseDto {

    @Override
    public String username() {
        return username;
    }

    @Override
    public String firstName() {
        return firstName;
    }

    @Override
    public String lastName() {
        return lastName;
    }

    @Override
    public String email() {
        return email;
    }

    @Override
    public String password() {
        return password;
    }

    @Override
    public String confirmedPassword() {
        return confirmedPassword;
    }

    @Override
    public boolean hasNullFields() {
        if (
                username == null ||
                firstName == null ||
                lastName == null ||
                email == null ||
                password == null ||
                confirmedPassword == null
        ) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return "RegisterNewUserRequest{" +
                "username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", confirmedPassword='" + confirmedPassword + '\'' +
                '}';
    }
}
