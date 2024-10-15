package no.oslomet.john_job_seeker.service;

import no.oslomet.john_job_seeker.payload.authentication.AuthenticationRequest;
import no.oslomet.john_job_seeker.payload.authentication.AuthenticationResponse;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    AuthenticationResponse login(AuthenticationRequest authenticationRequest) throws JSONException;
    AuthenticationResponse register(AuthenticationRequest authenticationRequest) throws JSONException;
}
