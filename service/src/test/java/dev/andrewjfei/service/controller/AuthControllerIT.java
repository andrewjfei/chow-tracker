package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.AuthDto;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.dto.NewChowDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.service.AuthService;
import dev.andrewjfei.service.util.TokenUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        properties = ("spring.datasource.url=jdbc:h2:mem:chow_tracker")
)
public class AuthControllerIT {

    private final String AUTH_URI = "/api/auth";

    private final String USERNAME = "staceywang"; // From data.sql
    private final String FIRST_NAME = "Stacey"; // From data.sql
    private final String LAST_NAME = "Wang"; // From data.sql
    private final String EMAIL = "staceywang@test.com"; // From data.sql
    private final String PASSWORD = "password"; // From data.sql

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private AuthController authController;

    @Autowired
    private AuthService authService;

    /******************************************************************************************/
    /*************************************** Auto Login ***************************************/
    /******************************************************************************************/

    @Test
    public void autoLogin_success_returnsUser() {
        // Given
        UserDto userDto = loginUser(USERNAME, EMAIL, PASSWORD);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + userDto.token());

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<UserDto> response = testRestTemplate.exchange(
                AUTH_URI + "/auto-login",
                HttpMethod.GET,
                request,
                UserDto.class
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

        Assertions.assertEquals(USERNAME, response.getBody().username());
        Assertions.assertEquals(FIRST_NAME, response.getBody().firstName());
        Assertions.assertEquals(LAST_NAME, response.getBody().lastName());
        Assertions.assertEquals(EMAIL, response.getBody().email());
        Assertions.assertEquals(userDto.token(), response.getBody().token());

        String token = response.getBody().token();

        // Validate token
        Assertions.assertDoesNotThrow(() -> TokenUtil.validateUserAuthToken(token));
    }

    @Test
    public void autoLogin_withInvalidToken_throwsException() {
        String invalidToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJmaXJzdE5hbWUiOiJCb2JieSIsImxhc3ROYW1lIjoiSm9uZXMiLCJpc3MiOiJhdXRoMCIsImlkIjoiMjQ0ZmRmNjYtNDI5ZS00ZDFiLTkxNTItNjE2Nzc1MTcyZTAxIiwiZXhwIjoxNjYyMjQ3MTQxLCJlbWFpbCI6ImJvYmJ5am9uZXNAdGVzdC5jb20iLCJ1c2VybmFtZSI6ImJvYmJ5am9uZXMifQ.fVNuQkh9jAISdrJ385yTDTVsXRXfzOJ7uw6UzL17r69MOuzVp1mRjvODNdMZ4o6Vg23xGNf--lbZnEkIQslePyoZudXT8Qe5vJVdWIV5WGhTV4J6zz4PGFIIOMG5OjJ6wOrYXAW8MsAvmS6c1owzzcGlxs-lXIFKaDEyesNAgxPAFSbZNPw-M442rzpXJHB0UKd_FRzgc5r2GZTrKjOtd-Ziqqzg3Wr-urBY4TiChJvzy3YZ7-9DtH0Ymafhe7XfIPk83hLaVtBctdC_lrVdGdZkQL9SzegvLAdC4g7WqSYBw1Jn5EE-JECHIimTrkduYYA7ywG4QvFG0w7q6eHkg2";

        // Given
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + invalidToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                AUTH_URI + "/auto-login",
                HttpMethod.GET,
                request,
                ErrorDto.class
        );

        // Then
        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        Assertions.assertEquals(Error.JWT_VERIFICATION_FAILURE.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.JWT_VERIFICATION_FAILURE.description, response.getBody().description());
    }

    /*************************************************************************************/
    /*************************************** Login ***************************************/
    /*************************************************************************************/

    @Test
    public void login_success_returnsUser() {
        // Given
        AuthDto authDto = createAuthDto(USERNAME, EMAIL, PASSWORD);

        HttpEntity<AuthDto> request = new HttpEntity<>(authDto);

        // When
        ResponseEntity<UserDto> response = testRestTemplate.exchange(
                AUTH_URI + "/login",
                HttpMethod.POST,
                request,
                UserDto.class
        );

        // Then
        Assertions.assertNotNull(response);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());

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
    public void login_withMissingRequestBodyProperties_throwsException() {
        // Given
        AuthDto authDto = createAuthDto(null, null, PASSWORD);

        HttpEntity<AuthDto> request = new HttpEntity<>(authDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.exchange(
                AUTH_URI + "/login",
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
    public void login_withInvalidUsername_throwsException() {
        String username = "joebloggs";

        // Given
        AuthDto authDto = createAuthDto(username, null, PASSWORD);

        HttpEntity<AuthDto> request = new HttpEntity<>(authDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.postForEntity(AUTH_URI + "/login", request, ErrorDto.class);

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.description, response.getBody().description());
    }

    @Test
    public void login_withInvalidEmail_throwsException() {
        String email = "joebloggs@test.com";

        // Given
        AuthDto authDto = createAuthDto(null, email, PASSWORD);

        HttpEntity<AuthDto> request = new HttpEntity<>(authDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.postForEntity(AUTH_URI + "/login", request, ErrorDto.class);

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.description, response.getBody().description());
    }

    @Test
    public void login_withIncorrectPassword_throwsException() {
        String password = "incorrect";

        // Given
        AuthDto authDto = createAuthDto(USERNAME, null, password);

        HttpEntity<AuthDto> request = new HttpEntity<>(authDto);

        // When
        ResponseEntity<ErrorDto> response = testRestTemplate.postForEntity(AUTH_URI + "/login", request, ErrorDto.class);

        // Then
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.errorCode, response.getBody().code());
        Assertions.assertEquals(Error.UNSUCCESSFUL_AUTHENTICATION.description, response.getBody().description());
    }

    /**********************************************************************************************/
    /*************************************** Helper Methods ***************************************/
    /**********************************************************************************************/

    private UserDto loginUser(String username, String email, String password) {
        AuthDto authDto = new AuthDto(username, email, password);
        return authService.authenticateUser(authDto);
    }

    private AuthDto createAuthDto(String username, String email, String password) {
        return new AuthDto(username, email, password);
    }
}
