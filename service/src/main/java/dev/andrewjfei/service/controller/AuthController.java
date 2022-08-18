package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.AuthDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody AuthDto authDto) {
        UserDto userDTO =  authService.authenticateUser(authDto);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
}
