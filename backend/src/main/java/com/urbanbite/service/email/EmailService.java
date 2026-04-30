package com.urbanbite.service.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends a simple text email.
     */
    public void sendSimpleEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            // Sender is picked from properties automatically, or you can specify:
            // message.setFrom("urbanbite@example.com");

            mailSender.send(message);
            logger.info("Successfully sent simple email to {}", to);
        } catch (Exception e) {
            logger.error("Failed to send simple email to {}. Error: {}", to, e.getMessage(), e);
        }
    }

    /**
     * Sends an HTML formatted email.
     */
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            logger.info("Successfully sent HTML email to {}", to);
        } catch (MessagingException e) {
            logger.error("Failed to send HTML email to {}. Error: {}", to, e.getMessage(), e);
        } catch (Exception e) {
            logger.error("Unexpected error sending HTML email to {}. Error: {}", to, e.getMessage(), e);
        }
    }
}
