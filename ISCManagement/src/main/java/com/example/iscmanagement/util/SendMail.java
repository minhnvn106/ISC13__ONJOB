package com.example.iscmanagement.util;

import java.io.IOException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendMail {
	@Autowired
	private JavaMailSender javaMailSender;

	public JavaMailSender getJavaMailSender() {
		return javaMailSender;
	}

	public void setJavaMailSender(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendEmail() {

		SimpleMailMessage msg = new SimpleMailMessage();
		
		msg.setTo("thnhlngtrung@gmail.com", "nguyentrongnghia.itnlu@gmail.com");
		msg.setSubject("This email send by AWP Spring Boot Application");

		msg.setText("Hello ISC management");

		javaMailSender.send(msg);

	}

	public void sendEmailWithAttachment(String[] sendTo,String subject,String text) throws MessagingException, IOException {

		MimeMessage msg = javaMailSender.createMimeMessage();

		// true = multipart message
		MimeMessageHelper helper = new MimeMessageHelper(msg, true);
		
		helper.setTo(sendTo);

		helper.setSubject(subject);

		// default = text/plain
		// helper.setText("Check attachment for image!");

		// true = text/html
		
		helper.setText(text, true);

		helper.addAttachment("my_photo.png", new ClassPathResource("computer3.jpg"));
	

		javaMailSender.send(msg);

	}
}
