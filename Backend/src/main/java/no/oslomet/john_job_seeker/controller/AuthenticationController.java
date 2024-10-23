package no.oslomet.john_job_seeker.controller;

import jakarta.mail.MessagingException;
import no.oslomet.john_job_seeker.payload.authentication.AuthenticationRequest;
import no.oslomet.john_job_seeker.payload.authentication.AuthenticationResponse;
import no.oslomet.john_job_seeker.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/auth/register")
    public AuthenticationResponse register(@RequestBody AuthenticationRequest authenticationRequest) throws JSONException {
        return authenticationService.register(authenticationRequest);
    }

    @PostMapping("/auth/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) throws JSONException {
        return authenticationService.login(authenticationRequest);
    }


    @PutMapping("/forgotten-Password")
    public AuthenticationResponse sendResetPassword(@RequestParam String email) throws MessagingException {
        return authenticationService.sendResetPassword(email);
    }

    @PutMapping("/reset-password")
    public AuthenticationResponse resetPassword(@RequestParam(name = "email") String email, @RequestParam(name = "password" ) String password){
        return authenticationService.resetPassword(email, password);
    }

}