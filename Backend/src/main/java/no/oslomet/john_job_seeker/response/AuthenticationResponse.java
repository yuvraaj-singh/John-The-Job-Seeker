package no.oslomet.john_job_seeker.response;

import lombok.Data;
import no.oslomet.john_job_seeker.dto.UserDTO;

@Data
public class AuthenticationResponse {
    private UserDTO user;
    private String message;
    private String token;
    private Boolean error;
}
