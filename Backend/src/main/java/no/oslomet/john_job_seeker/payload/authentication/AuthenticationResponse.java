package no.oslomet.john_job_seeker.payload.authentication;

import lombok.Data;
import no.oslomet.john_job_seeker.dto.UserDTO;

@Data
public class AuthenticationResponse {
    private UserDTO user;
    private String message;
    private Boolean error;
    private Boolean tokenUser = false;
}
