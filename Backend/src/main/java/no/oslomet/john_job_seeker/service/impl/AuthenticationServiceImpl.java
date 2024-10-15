package no.oslomet.john_job_seeker.service.impl;

import no.oslomet.john_job_seeker.dto.UserDTO;
import no.oslomet.john_job_seeker.model.User;
import no.oslomet.john_job_seeker.repository.UserRepository;
import no.oslomet.john_job_seeker.payload.authentication.AuthenticationRequest;
import no.oslomet.john_job_seeker.payload.authentication.AuthenticationResponse;
import no.oslomet.john_job_seeker.service.AuthenticationService;
import no.oslomet.john_job_seeker.utils.PasswordEncorder;
import no.oslomet.john_job_seeker.utils.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    private final AuthenticationResponse authenticationResponse = new AuthenticationResponse();

    public AuthenticationResponse register(AuthenticationRequest authenticationRequest) {

        if(authenticationRequest.getToken()){
            authenticationRequest.getUser().setPassword(RandomStringGenerator.generateRandomString());
        }

        if(userRepository.findByEmail(authenticationRequest.getUser().getEmail()) != null){
            authenticationResponse.setError(Boolean.TRUE);
            authenticationResponse.setMessage("User already exists");
        } else {
            authenticationRequest.getUser().setPassword(PasswordEncorder.encode(authenticationRequest.getUser().getPassword()));
            User user = userRepository.save(authenticationRequest.getUser());
            authenticationResponse.setUser(new UserDTO(user.getFirstName(),user.getLastName(),user.getEmail()));
            authenticationResponse.setError(Boolean.FALSE);
            authenticationResponse.setMessage("Registered successfully");
        }
        return authenticationResponse;
    }

    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) {

        User user = userRepository.findByEmail(authenticationRequest.getUser().getEmail());
        if(user != null){
            if(PasswordEncorder.matchEncodedString(authenticationRequest.getUser().getPassword(), user.getPassword())){
                authenticationResponse.setUser(new UserDTO(user.getFirstName(),user.getLastName(),user.getEmail()));
                authenticationResponse.setMessage("Login successful");
                authenticationResponse.setError(Boolean.FALSE);

            }else {
                authenticationResponse.setError(Boolean.TRUE);
                authenticationResponse.setMessage("Bad credentials");
            }
        }else {
            if(authenticationRequest.getToken()){
                return register(authenticationRequest);
            }
            authenticationResponse.setError(Boolean.TRUE);
            authenticationResponse.setMessage("User not found");
        }
        return authenticationResponse;
    }
}
