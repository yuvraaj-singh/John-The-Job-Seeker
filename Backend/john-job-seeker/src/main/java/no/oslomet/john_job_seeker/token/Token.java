package no.oslomet.john_job_seeker.token;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

import javax.swing.text.html.parser.Entity;

@jakarta.persistence.Entity
@Table(name = "tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String token;
    public TokenType tokenType = TokenType.BEARER;
    public boolean revoked;
    public boolean expired;

}
