package no.oslomet.john_job_seeker.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query
    List<Token> findAllValidTokenByUser(Integer id);


    Optional<Token> findByToken(String token);
}
