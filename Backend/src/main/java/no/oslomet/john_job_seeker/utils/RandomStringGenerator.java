package no.oslomet.john_job_seeker.utils;

import java.nio.charset.Charset;
import java.util.Random;

public class RandomStringGenerator {

    public static String generateRandomString(){
        byte[] array = new byte[7]; // length is bounded by 7
        new Random().nextBytes(array);
        return new String(array, Charset.forName("UTF-8"));
    }

}
