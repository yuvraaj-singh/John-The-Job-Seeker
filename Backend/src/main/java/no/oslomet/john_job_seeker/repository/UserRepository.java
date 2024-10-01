package no.oslomet.john_job_seeker.repository;

import no.oslomet.john_job_seeker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        User findByEmail(String email);
}

