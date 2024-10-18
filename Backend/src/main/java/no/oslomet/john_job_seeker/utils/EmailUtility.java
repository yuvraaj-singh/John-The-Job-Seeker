package no.oslomet.john_job_seeker.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

public class EmailUtility {
    @Autowired
    private final JavaMailSender javaMailSender = new JavaMailSenderImpl();

    public void sendSetPassword(String email) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Reset password");
        mimeMessageHelper.setText("""
        <div>
          <a href="http://localhost:8080/set-password?email=%s" target="_blank">click link to set new password</a>
        </div>
        """.formatted(email), true);
    }
}
