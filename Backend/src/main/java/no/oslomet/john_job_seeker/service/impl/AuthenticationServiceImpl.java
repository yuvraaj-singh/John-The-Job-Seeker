package no.oslomet.john_job_seeker.service.impl;

import no.oslomet.john_job_seeker.dto.UserDTO;
import no.oslomet.john_job_seeker.model.User;
import no.oslomet.john_job_seeker.repository.UserRepository;
import no.oslomet.john_job_seeker.response.AuthenticationRequest;
import no.oslomet.john_job_seeker.response.AuthenticationResponse;
import no.oslomet.john_job_seeker.service.AuthenticationService;
import no.oslomet.john_job_seeker.utils.PasswordEncorder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    private final AuthenticationResponse authenticationResponse = new AuthenticationResponse();

    public AuthenticationResponse register(AuthenticationRequest authenticationRequest) {

        if(userRepository.findByEmail(authenticationRequest.getUser().getEmail()) != null){
            authenticationResponse.setError(Boolean.TRUE);
            authenticationResponse.setMessage("User already exists");
        }else {
            authenticationRequest.getUser().setPassword(PasswordEncorder.encode(authenticationRequest.getUser().getPassword()));
            User user = userRepository.save(authenticationRequest.getUser());
            authenticationResponse.setUser(new UserDTO(user.getFirstName(),user.getLastName(),user.getEmail()));
            authenticationResponse.setError(Boolean.FALSE);
            authenticationResponse.setMessage("Registered successfully");
            authenticationResponse.setToken("Token to be available soon!");
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
                authenticationResponse.setToken("Token to be available soon!");

            }else {
                authenticationResponse.setError(Boolean.TRUE);
                authenticationResponse.setMessage("Bad credentials");
            }
        }else {
            authenticationResponse.setError(Boolean.TRUE);
            authenticationResponse.setMessage("User not found");
        }
        return authenticationResponse;
    }
}
