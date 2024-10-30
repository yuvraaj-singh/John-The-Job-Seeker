package no.oslomet.john_job_seeker.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import no.oslomet.john_job_seeker.model.User;
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

        String htmlMsg =
                "<!DOCTYPE html>" +
                        "<html>" +
                        "<head>" +
                        "    <meta charset='UTF-8'>" +
                        "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                        "    <style>" +
                        "                body {" +
                        "                    font-family: 'Inter', -apple-system, sans-serif;" +
                        "                    line-height: 1.7;" +
                        "                    color: #2D3748;" +
                        "                    max-width: 600px;" +
                        "                    margin: 0 auto;" +
                        "                    padding: 40px 20px;" +
                        "                    background-color: #F7FAFC;" +
                        "                    position: relative;" +
                        "                }" +
                        "                .container {" +
                        "                    background-color: rgba(255, 255, 255, 0.95);" +
                        "                    padding: 48px;" +
                        "                    border-radius: 12px;" +
                        "                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);" +
                        "                    position: relative;" +
                        "                    z-index: 1;" +
                        "                    backdrop-filter: blur(10px);" +
                        "                }" +
                        "                .logo {" +
                        "                    text-align: center;" +
                        "                    margin-bottom: 48px;" +
                        "                    font-size: 24px;" +
                        "                    font-weight: 300;" +
                        "                    letter-spacing: -0.5px;" +
                        "                }" +
                        "                .btn {" +
                        "                    display: inline-block;" +
                        "                    padding: 16px 32px;" +
                        "                    background-color: #000000;" +
                        "                    color: white;" +
                        "                    text-decoration: none;" +
                        "                    border-radius: 6px;" +
                        "                    font-weight: 500;" +
                        "                    margin: 48px 0;" +
                        "                }" +
                        "                .footer {" +
                        "                    margin-top: 48px;" +
                        "                    font-size: 14px;" +
                        "                    color: #718096;" +
                        "                    text-align: center;" +
                        "                }" +
                        "                .divider {" +
                        "                    height: 1px;" +
                        "                    background-color: #E2E8F0;" +
                        "                    margin: 48px 0;" +
                        "                    border: none;" +
                        "                }" +
                        "                .abstract-art {" +
                        "                    position: absolute;" +
                        "                    top: 0;" +
                        "                    left: 0;" +
                        "                    width: 100%;" +
                        "                    height: 100%;" +
                        "                    z-index: 0;" +
                        "                }" +
                        "                .signature {" +
                        "                    font-family: 'Courier New', monospace;" +
                        "                    font-size: 14px;" +
                        "                    color: #718096;" +
                        "                    margin-top: 24px;" +
                        "                }" +
                        "    </style>" +
                        "</head>" +
                        "<body>" +
                        "    <svg class='abstract-art' viewBox='0 0 600 800' xmlns='http://www.w3.org/2000/svg'>" +
                        "        <!-- Subtle background shapes -->" +
                        "        <defs>" +
                        "            <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>" +
                        "                <stop offset='0%' style='stop-color:#F0F4F8;stop-opacity:0.8' />" +
                        "                <stop offset='100%' style='stop-color:#E6FFFA;stop-opacity:0.8' />" +
                        "            </linearGradient>" +
                        "        </defs>" +
                        "        <path d='M0,0 Q300,100 600,0 Q600,400 300,300 Q0,400 0,0' fill='url(#grad1)'/>" +
                        "        <circle cx='500' cy='150' r='100' fill='#F7FAFC' opacity='0.5'/>" +
                        "        <path d='M100,200 Q200,150 150,300 T100,400' stroke='#E6FFFA' fill='none' stroke-width='40' opacity='0.3'/>" +
                        "    </svg>" +

                        "    <div class='container'>" +
                        "        <div class='logo'>" +
                        "            Career Coach" +
                        "        </div>" +

                        "        <h2 style='font-weight: 400; margin-bottom: 24px;'>Reset your password</h2>" +

                        "        <p>Hello,</p>" +

                        "        <p style='margin: 24px 0;'>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>" +

                        "                <div style='text-align: center;'>" +
                        "            <a href='http://localhost:8080/api/reset-password?email=%s' class='btn'>Reset Password</a>" +
                        "        </div>" +

                        "        <p style='font-size: 14px; color: #718096;'>Link expires in 60 minutes</p>" +

                        "        <div class='footer'>" +
                        "            <hr class='divider'>" +
                        "            <p>With care,</p>" +
                        "            <div class='signature'>" +
                        "                Oslomet ACIT 4080 Team" +
                        "                <br>" +
                        "        Career Coach Founders" +
                        "                </div>" +
                        "        </div>" +
                        "    </div>" +
                        "</body>" +
                       " </html>";

        helper.setText(htmlMsg, true);
        helper.setTo(email);
        helper.setSubject("Reset password");
        helper.setFrom("flangsem@gmail.com");
        mailSender.send(mimeMessage);
    }

    public void sendWelcomeMessage(User user) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String htmlMsg =
                "<!DOCTYPE html>" +
                        "<html>" +
                        "<head>" +
                        "    <meta charset='UTF-8'>" +
                        "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                        "    <style>" +
                        "                body {" +
                        "            font-family: 'Inter', -apple-system, sans-serif;" +
                        "            line-height: 1.7;" +
                        "            color: #2D3748;" +
                        "            max-width: 600px;" +
                        "            margin: 0 auto;" +
                        "            padding: 40px 20px;" +
                        "            background-color: #F7FAFC;" +
                        "            position: relative;" +
                        "        }" +
                        "        .container {" +
                        "            background-color: rgba(255, 255, 255, 0.95);" +
                        "            padding: 48px;" +
                        "            border-radius: 12px;" +
                        "            box-shadow: 0 1px 3px rgba(0,0,0,0.05);" +
                        "            position: relative;" +
                        "            z-index: 1;" +
                        "            backdrop-filter: blur(10px);" +
                        "        }" +
                        "        .logo {" +
                        "            text-align: center;" +
                        "            margin-bottom: 48px;" +
                        "            font-size: 24px;" +
                        "            font-weight: 300;" +
                        "            letter-spacing: -0.5px;" +
                        "        }" +
                        "        .feature {" +
                        "            margin: 32px 0;" +
                        "            padding: 24px 0;" +
                        "            background: linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.95));" +
                        "            border-radius: 8px;" +
                        "        }" +
                        "        .feature-title {" +
                        "            font-weight: 500;" +
                        "            margin-bottom: 8px;" +
                        "            font-size: 18px;" +
                        "        }" +
                        "        .feature-description {" +
                        "            color: #718096;" +
                        "            margin: 0;" +
                        "        }" +
                        "        .btn {" +
                        "            display: inline-block;" +
                        "            padding: 16px 32px;" +
                        "            background-color: #000000;" +
                        "            color: white;" +
                        "            text-decoration: none;" +
                        "            border-radius: 6px;" +
                        "            font-weight: 500;" +
                        "        }" +
                        "        .footer {" +
                        "            margin-top: 48px;" +
                        "            font-size: 14px;" +
                        "            color: #718096;" +
                        "            text-align: center;" +
                        "        }" +
                        "        .social-links {" +
                        "            margin: 24px 0;" +
                        "        }" +
                        "        .social-links a {" +
                        "            color: #718096;" +
                        "            text-decoration: none;" +
                        "            margin: 0 12px;" +
                        "        }" +
                        "        .divider {" +
                        "            height: 1px;" +
                        "            background-color: #E2E8F0;" +
                        "            margin: 32px 0;" +
                        "            border: none;" +
                        "        }" +
                        "        .abstract-art {" +
                        "            position: absolute;" +
                        "            top: 0;" +
                        "            left: 0;" +
                        "            width: 100%;" +
                        "            height: 100%;" +
                        "            z-index: 0;" +
                        "        }" +
                        "        .signature {" +
                        "            font-family: 'Courier New', monospace;" +
                        "            font-size: 14px;" +
                        "            color: #718096;" +
                        "            margin-top: 24px;" +
                        "        }" +
                        "    </style>" +
                        "</head>" +
                        "<body>" +
                        "    <svg class='abstract-art' viewBox='0 0 600 800' xmlns='http://www.w3.org/2000/svg'>" +
                        "        <!-- Organic shapes for welcome email -->" +
                        "        <defs>" +
                        "            <linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'>" +
                        "                <stop offset='0%' style='stop-color:#F0F4F8;stop-opacity:0.8' />" +
                        "                <stop offset='100%' style='stop-color:#EBF8FF;stop-opacity:0.8' />" +
                        "            </linearGradient>" +
                        "        </defs>" +
                        "        <path d='M600,0 Q300,200 0,0 Q0,400 300,600 Q600,400 600,0' fill='url(#grad2)'/>" +
                        "        <circle cx='100' cy='200' r='150' fill='#F7FAFC' opacity='0.5'/>" +
                        "        <path d='M400,100 Q500,300 400,500 T300,700' stroke='#EBF8FF' fill='none' stroke-width='60' opacity='0.3'/>" +
                        "    </svg>" +

                        "    <div class='container'>" +
                        "        <div class='logo'>" +
                        "                Career Coach" +
                        "                </div>" +

                        "        <h2 style='font-weight: 400; margin-bottom: 24px;'>Welcome to Career Coach</h2>" +

                        "        <p style='margin: 24px 0;'>Hi " + user.getFirstName()+ ",</p>" +

                        "        <p>We're thrilled to have you join our community of ambitious graduates. As founders who've been through the job search journey ourselves, we've built the tools we wish we had.</p>" +

                        "                <div class='feature'>" +
                        "            <div class='feature-title'>CV Enhancement</div>" +
                        "            <p class='feature-description'>Optimize your CV with AI-powered suggestions tailored to your target roles.</p>" +
                        "        </div>" +

                        "        <div class='feature'>" +
                        "            <div class='feature-title'>Smart Job Matching</div>" +
                        "            <p class='feature-description'>Find opportunities that align with your skills and aspirations.</p>" +
                        "        </div>" +

                        "        <div class='feature'>" +
                        "            <div class='feature-title'>Interview Preparation</div>" +
                        "            <p class='feature-description'>Practice with our interview simulator to build confidence.</p>" +
                        "        </div>" +

                        "        <div style='text-align: center; margin: 48px 0;'>" +
                        "            <a href='http://localhost:3000/login' class='btn'>Get Started</a>" +
                        "        </div>" +

                        "        <div class='footer'>" +
                        "            <hr class='divider'>" +
                        "            <div class='social-links'>" +
                        "                <a href='{{social_linkedin}}'>LinkedIn</a>" +
                        "                <a href='{{social_twitter}}'>Twitter</a>" +
                        "                <a href='{{social_instagram}}'>Instagram</a>" +
                        "            </div>" +
                        "            <p>We're here to help you succeed,</p>" +
                        "                <div class='signature'>" +
                        "                Oslomet ACIT 4080 Team" +
                        "                <br>" +
                        "        Career Coach Founders" +
                        "                </div>" +
                        "        </div>" +
                        "    </div>" +
                        "</body>" +
                        "</html>";
        helper.setText(htmlMsg, true);
        helper.setTo(user.getEmail());
        helper.setSubject("Welcome to us");
        helper.setFrom("flangsem@gmail.com");
        mailSender.send(mimeMessage);
    }

}
