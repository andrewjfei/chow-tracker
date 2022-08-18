package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.dto.NewUserDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.repository.UserRepository;
import dev.andrewjfei.service.util.TokenUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = ("spring.datasource.url=jdbc:h2:mem:chow_tracker")
)
public class UserControllerIT {

    private final String USER_URI = "/api/user";

    private final String USERNAME = "georgebanks";
    private final String FIRST_NAME = "George";
    private final String LAST_NAME = "Banks";
    private final String EMAIL = "georgebanks@test.com";
    private final String PASSWORD = "password";
    private final String CONFIRMED_PASSWORD = "password";

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    public void cleanup() {
        deleteUserByUsername(USERNAME);
    }

    /*************************************************************************************************/
    /*************************************** Register New User ***************************************/
    /*************************************************************************************************/

    @Test
    public void registerNewUser_success_returnsUser() {
        // Given
        NewUserDto newUserDto = createNewUserDto(USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CONFIRMED_PASSWORD);

        HttpEntity<NewUserDto> request = new HttpEntity<>(newUserDto);

        // When
        ResponseEntity<UserDto> response = testRestTemplate.exchange(
                USER_URI + "/register",
                HttpMethod.POST,
                request,
                UserDto.class
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());

        Assertions.assertEquals(USERNAME, response.getBody().username());
        Assertions.assertEquals(FIRST_NAME, response.getBody().firstName());
        Assertions.assertEquals(LAST_NAME, response.getBody().lastName());
        Assertions.assertEquals(EMAIL, response.getBody().email());
        Assertions.assertNotNull(response.getBody().token());

        String token = response.getBody().token();

        // Validate token
        Assertions.assertDoesNotThrow(() -> TokenUtil.validateUserAuthToken(token));
    }

    @Test
    public void registerNewUser_withMissingRequestBodyProperties_throwsException() {
        // Given
        NewUserDto newUserDto = createNewUserDto(USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, null);

        HttpEntity<NewUserDto> request = new HttpEntity<>(newUserDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                USER_URI + "/register",
                HttpMethod.POST,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.INVALID_REQUEST_BODY.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.INVALID_REQUEST_BODY.description, response.getBody().description());
    }

    @Test
    public void registerNewUser_withMismatchedPasswords_throwsException() {
        // Given
        String confirmPassword = "incorrect";

        NewUserDto newUserDto = createNewUserDto(USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, confirmPassword);

        HttpEntity<NewUserDto> request = new HttpEntity<>(newUserDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                USER_URI + "/register",
                HttpMethod.POST,
                request,
                ErrorDto.class
        );;

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.PASSWORD_MISMATCH.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.PASSWORD_MISMATCH.description, response.getBody().description());
    }

    @Test
    public void registerNewUser_withUserAlreadyExists_throwsException() {
        // Given
        String username = "staceywang"; // From data.sql

        NewUserDto newUserDto = createNewUserDto(username, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, CONFIRMED_PASSWORD);

        HttpEntity<NewUserDto> request = new HttpEntity<>(newUserDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                USER_URI + "/register",
                HttpMethod.POST,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.USERNAME_EXISTS.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.USERNAME_EXISTS.description, response.getBody().description());
    }

    @Test
    public void registerNewUser_withEmailAlreadyExists_throwsException() {
        // Given
        String email = "staceywang@test.com"; // From data.sql

        NewUserDto newUserDto = createNewUserDto(USERNAME, FIRST_NAME, LAST_NAME, email, PASSWORD, CONFIRMED_PASSWORD);

        HttpEntity<NewUserDto> request = new HttpEntity<>(newUserDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                USER_URI + "/register",
                HttpMethod.POST,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.EMAIL_EXISTS.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.EMAIL_EXISTS.description, response.getBody().description());
    }

    /**********************************************************************************************/
    /*************************************** Helper Methods ***************************************/
    /**********************************************************************************************/

    private NewUserDto createNewUserDto(
            String username,
            String firstName,
            String lastName,
            String email,
            String password,
            String confirmedPassword
    ) {
        return new NewUserDto(
                username,
                firstName,
                lastName,
                email,
                password,
                confirmedPassword
        );
    }

    private void deleteUserByUsername(String username) {
        UserDao userDao = userRepository.retrieveUserByUsername(username);

        if (userDao != null && userDao.getId() != null) {
            userRepository.deleteById(userDao.getId());
        }
    }
}
