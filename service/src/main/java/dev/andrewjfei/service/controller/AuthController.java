package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.AuthDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.service.AuthService;
import dev.andrewjfei.service.service.UserService;
import dev.andrewjfei.service.util.RequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @GetMapping("/auto-login")
    public ResponseEntity<UserDto> autoLogin(HttpServletRequest request) {
        String userId = RequestUtil.getUserIdAttribute(request);
        String userToken = request.getHeader("Authorization").split(" ")[1];

        UserDto userDto =  userService.retrieveUserById(userId, userToken);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody AuthDto authDto) {
        UserDto userDto =  authService.authenticateUser(authDto);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }
}
