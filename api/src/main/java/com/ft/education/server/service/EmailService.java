package com.ft.education.server.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.ft.education.server.helpers.InitializationHelpers;
import com.ft.education.server.service.serviceinterface.EmailServiceInterface;

import jakarta.mail.internet.MimeMessage;

/**
 * @author lemonftdev
 */
@Service
public class EmailService implements EmailServiceInterface {

    @Autowired
    private JavaMailSender mailSender;

    private String loadTemplate(String templateName) throws IOException {
        String templatePath = "src/main/resources/templates/" + templateName;
        return new String(Files.readAllBytes(Paths.get(templatePath)));
    }

    @Override
    public String sendVerifycationEmailCode(String to) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String uniqueNumber = InitializationHelpers.uniqueNumber();
            String htmlTemplate = loadTemplate("email_verification_template.html");

            String htmlMsg = htmlTemplate
                    .replace("${uniqueNumber}", uniqueNumber)
                    .replace("${currentDate}", String.valueOf(new Date()));

            helper.setTo(to);
            helper.setSubject("Email Verification");
            helper.setText(htmlMsg, true);
            mailSender.send(message);
            return uniqueNumber;
        } catch (Exception e) {
            System.err.println(e);
            return "";
        }
    }
}
