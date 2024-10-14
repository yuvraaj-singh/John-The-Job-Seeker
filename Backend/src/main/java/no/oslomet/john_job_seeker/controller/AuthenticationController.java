package no.oslomet.john_job_seeker.controller;

import no.oslomet.john_job_seeker.response.AuthenticationRequest;
import no.oslomet.john_job_seeker.response.AuthenticationResponse;
import no.oslomet.john_job_seeker.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/auth/register")
    public AuthenticationResponse register(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.register(authenticationRequest);
    }

    @PostMapping("/auth/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.login(authenticationRequest);
    }

}
