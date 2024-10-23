package no.oslomet.john_job_seeker.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailUtility {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSetPassword(String email) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String htmlMsg = "<div>\n" +
                String.format("<a href=\"http://localhost:8080/api/reset-password?email=%s\" target=\"_blank\">click link to set new password</a>\n", email) +
                "        </div>";

        helper.setText(htmlMsg, true);
        helper.setTo(email);
        helper.setSubject("Reset password");
        helper.setFrom("flangsem@gmail.com");
        mailSender.send(mimeMessage);
    }
}
