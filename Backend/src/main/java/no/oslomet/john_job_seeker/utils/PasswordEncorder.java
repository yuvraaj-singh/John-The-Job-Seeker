package no.oslomet.john_job_seeker.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncorder {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public static String encode(String text){
        return encoder.encode(text);
    }

    public static boolean matchEncodedString(String text, String encodedString){
        return encoder.matches(text, encodedString);
    }
}
