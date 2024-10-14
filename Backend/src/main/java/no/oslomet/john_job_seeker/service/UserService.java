package no.oslomet.john_job_seeker.service;

import no.oslomet.john_job_seeker.model.User;

public interface UserService {
    User findByEmail(String email);
}
