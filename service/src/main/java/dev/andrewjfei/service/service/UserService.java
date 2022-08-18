package dev.andrewjfei.service.service;

import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.NewUserDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import dev.andrewjfei.service.repository.UserRepository;
import dev.andrewjfei.service.util.CryptoUtil;
import dev.andrewjfei.service.util.MapperUtil;
import dev.andrewjfei.service.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDto createNewUser(NewUserDto newUserDto) {
        // Validate user information
        validateNewUser(newUserDto);

        // Encrypt password
        String encryptedPassword = CryptoUtil.encryptPassword(newUserDto.password());

        // Create user
        UserDao userDao = new UserDao(
                newUserDto.username(),
                newUserDto.firstName(),
                newUserDto.lastName(),
                newUserDto.email(),
                encryptedPassword
        );

        // Save user
        UserDao newUserDAO = userRepository.save(userDao);

        // Get token
        String token = TokenUtil.generateUserAuthToken(newUserDAO);

        return MapperUtil.toDto(newUserDAO, token);
    }

    public boolean isUsernameAvailable(String username) {
        UserDao userDao = userRepository.retrieveUserByUsername(username);

        if (userDao != null) {
            throw new ChowTrackerServiceException(Error.USERNAME_EXISTS, HttpStatus.BAD_REQUEST);
        }

        return true;
    }

    public boolean isEmailAvailable(String email) {
        UserDao userDao = userRepository.retrieveUserByEmail(email);

        if (userDao != null) {
            throw new ChowTrackerServiceException(Error.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
        }

        return true;
    }

    private void validateNewUser(NewUserDto newUserDto) {
        // Check for null values
        if (newUserDto.hasNullFields()) {
            throw new ChowTrackerServiceException(Error.INVALID_REQUEST_BODY, HttpStatus.BAD_REQUEST);
        }

        // Check password and confirmed passwords match
        if (!newUserDto.password().equals(newUserDto.confirmedPassword())) {
            throw new ChowTrackerServiceException(Error.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
        }

        // TODO: Check if valid email using regex

        // Check availability of username and email
        isUsernameAvailable(newUserDto.username());
        isEmailAvailable(newUserDto.email());
    }
}
