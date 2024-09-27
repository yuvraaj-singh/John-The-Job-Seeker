package no.oslomet.john_job_seeker.controller;

import jakarta.servlet.http.HttpServletResponse;
import no.oslomet.john_job_seeker.model.User;
import no.oslomet.john_job_seeker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import no.oslomet.john_job_seeker.config.JwtService;

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
    public ResponseEntity<String> register(@RequestBody User user) throws Exception {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new Exception("Email already exists");
        }
        userService.saveUser(user);
        return ResponseEntity.ok(JwtService.generateToken(user));
    }

    @GetMapping("/loginSuccess")
    public void oauthLogin(@RequestParam(name = "Jwt")String token, @RequestParam(name = "user") UserDetails userDetails, HttpServletResponse response) {
        if (!JwtService.isTokenValid(token, userDetails)){
            response.setHeader("Location", "http://localhost:8080/handleRefresh"); //Add true path here
        }
        response.setHeader("Location",String.format(String.format(String.format("http://localhost:8080/landingPage?%s",token),"%s"),userDetails));  //Add true path here
        response.setStatus(302);
    }

    @GetMapping("/login")
    public void  login(@RequestBody User user, HttpServletResponse response) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser == null) {
            response.setHeader("Message","Email does not exist");
            response.setStatus(401);
        }
        else if (bCryptPasswordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            response.setHeader("Location",String.format(String.format(String.format("http://localhost:8080/landingPage?%s",user),"%s"),user));//Add true path here
            response.setStatus(302);
        } else {
            response.setHeader("Message","Invalid credentials");
            response.setStatus(401);
        }
    }
}
