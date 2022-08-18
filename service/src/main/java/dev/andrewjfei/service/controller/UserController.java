package dev.andrewjfei.service.controller;

import dev.andrewjfei.service.dto.NewUserDto;
import dev.andrewjfei.service.dto.UserDto;
import dev.andrewjfei.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerNewUser(@RequestBody NewUserDto newUserDto) {
        UserDto userDto = userService.createNewUser(newUserDto);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }
}
