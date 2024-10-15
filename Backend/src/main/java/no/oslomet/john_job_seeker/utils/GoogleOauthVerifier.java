package no.oslomet.john_job_seeker.utils;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import no.oslomet.john_job_seeker.dto.UserDTO;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleOauthVerifier {

    private final RestTemplate restTemplate = new RestTemplate();

    public JSONObject fetchUserDetailsFromGoogleAPI(String idToken) {
        try {
            String url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + idToken;
            // Sending the GET request
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // Checking for HTTP status code 200 (OK)
            if (response.getStatusCode().is2xxSuccessful()) {
                // Parsing response body into JSON object
                return new JSONObject(response.getBody());
            } else {
                System.err.println("Error: Received non-200 status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            // Handle errors such as network issues
            System.err.println("Error fetching user details: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public UserDTO getUserDetails(String idToken) throws JSONException {
        JSONObject userDetails = fetchUserDetailsFromGoogleAPI(idToken);
        return new UserDTO(userDetails.getString("given_name"),
                userDetails.getString("family_name"),
                userDetails.getString("email"));
    }
}
