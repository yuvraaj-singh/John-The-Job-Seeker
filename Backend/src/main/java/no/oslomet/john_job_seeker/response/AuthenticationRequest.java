package no.oslomet.john_job_seeker.response;

import lombok.Data;
import no.oslomet.john_job_seeker.model.User;

@Data
public class AuthenticationRequest {
    private User user;
}
