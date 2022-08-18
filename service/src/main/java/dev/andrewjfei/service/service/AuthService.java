package dev.andrewjfei.service.service;

import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.dto.AuthDto;
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
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public UserDto authenticateUser(AuthDto authDto) {
        if (authDto.hasMissingFields()) {
            throw new ChowTrackerServiceException(Error.INVALID_REQUEST_BODY, HttpStatus.BAD_REQUEST);
        }

        UserDao userDAO = userRepository.retrieveUserByUsernameOrEmail(authDto.username(), authDto.email());

        if (
                userDAO == null ||
                userDAO.getPassword() == null ||
                !CryptoUtil.isPasswordValid(authDto.password(), userDAO.getPassword())
        ) {
            throw new ChowTrackerServiceException(Error.UNSUCCESSFUL_AUTHENTICATION, HttpStatus.BAD_REQUEST);
        }

        // Get token
        String token = TokenUtil.generateUserAuthToken(userDAO);

        return MapperUtil.toDto(userDAO, token);
    }
}
