package no.oslomet.john_job_seeker.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import no.oslomet.john_job_seeker.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.internal.Function;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {


    @Value("${JWTSECRETKEY}")
    private static String secretKey;

    @Value("${EXPIRATION}")
    private static long jwtExpiration;

    @Value("${REFRESHEXPIRATION")
    private long refreshExpiration;

    public static String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private static Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static String generateToken(User user){
        return generateToken(new HashMap<>(), user);
    }
    public static String generateToken(Map<String, Object> extraClaims, User user){
        return buildToken(extraClaims, user, jwtExpiration);
    }

    private static String buildToken(Map<String, Object> extractClaims, User user, long expiration){
        return Jwts.builder()
                .claims()
                .add(extractClaims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .and()
                .signWith(getSignInKey())
                .compact();
    }

    private static SecretKey getSignInKey(){

        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    public static boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private static boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private static Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
