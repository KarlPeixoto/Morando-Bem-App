package com.neki.sistemaskill.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCodigoConfirmacao(String email, String codigo) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Confirmação de cadastro - Morando Bem App");
            message.setText("Seu código de confirmação é: " + codigo + "\n\n" +
                           "Digite este código no sistema para confirmar seu cadastro.");
            mailSender.send(message);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }
}
