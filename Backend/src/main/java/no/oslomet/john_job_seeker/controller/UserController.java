package no.oslomet.john_job_seeker.controller;

import no.oslomet.john_job_seeker.model.User;
import no.oslomet.john_job_seeker.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return "Email already exists";
        }
        userService.saveUser(user);
        return "User registered successfully";
    }

    @GetMapping("/loginSuccess")
    public String oauthLogin() {
        return "Login Successful";
    }

    /*@PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser == null) {
            return "Email does not exist";
        }
        else if (existingUser != null && bCryptPasswordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    } */
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    User existingUser = userService.findByEmail(user.getEmail());
    if (existingUser == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email does not exist");
    } else if (bCryptPasswordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("name", existingUser.getFirstName());  // Assuming `getName()` returns user's name
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
}
