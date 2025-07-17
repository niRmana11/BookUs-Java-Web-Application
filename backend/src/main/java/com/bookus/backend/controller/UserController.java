package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.model.User;
import com.bookus.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    // create a user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


}
