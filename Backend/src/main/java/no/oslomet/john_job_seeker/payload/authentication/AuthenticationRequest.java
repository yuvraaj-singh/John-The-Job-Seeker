package no.oslomet.john_job_seeker.payload.authentication;

import lombok.Data;
import no.oslomet.john_job_seeker.model.User;

@Data
public class AuthenticationRequest {
    private User user;
    private Boolean token;
}
