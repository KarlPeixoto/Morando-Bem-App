package com.neki.sistemaskill.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCodigoConfirmacao(String email, String codigo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(email);
            helper.setSubject("🏠 Bem-vindo ao Morando Bem - Confirme seu cadastro!");
            helper.setText(gerarTemplateEmail(codigo), true);
            
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }

    private String gerarTemplateEmail(String codigo) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html lang=\"pt-BR\">");
        html.append("<head>");
        html.append("<meta charset=\"UTF-8\">");
        html.append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
        html.append("<title>Bem-vindo ao Morando Bem</title>");
        html.append("<style>");
        html.append("* { margin: 0; padding: 0; box-sizing: border-box; }");
        html.append("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; margin: 0; padding: 0; }");
        html.append(".container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }");
        html.append(".header { background-color: #667eea; color: #ffffff; padding: 30px 20px; text-align: center; }");
        html.append(".header h1 { font-size: 28px; margin-bottom: 10px; font-weight: bold; }");
        html.append(".header p { font-size: 16px; opacity: 0.9; }");
        html.append(".content { padding: 30px 20px; }");
        html.append(".welcome-text { font-size: 18px; color: #555555; margin-bottom: 30px; text-align: center; }");
        html.append(".code-container { background-color: #f093fb; border-radius: 10px; padding: 25px; text-align: center; margin: 30px 0; }");
        html.append(".code-label { color: #ffffff; font-size: 16px; margin-bottom: 15px; font-weight: bold; }");
        html.append(".code { background-color: #ffffff; border: 2px solid #ffffff; border-radius: 8px; padding: 15px 25px; font-size: 28px; font-weight: bold; color: #f093fb; letter-spacing: 3px; display: inline-block; min-width: 180px; }");
        html.append(".instructions { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; }");
        html.append(".instructions h3 { color: #667eea; margin-bottom: 15px; font-size: 18px; }");
        html.append(".instructions ul { padding-left: 20px; }");
        html.append(".instructions li { margin-bottom: 8px; color: #555555; }");
        html.append(".features { margin: 30px 0; }");
        html.append(".feature { text-align: center; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 15px; }");
        html.append(".feature-icon { font-size: 24px; margin-bottom: 10px; }");
        html.append(".feature-title { font-weight: bold; color: #333333; margin-bottom: 5px; }");
        html.append(".feature-desc { font-size: 14px; color: #666666; }");
        html.append(".footer { background-color: #2c3e50; color: #ffffff; padding: 30px 20px; text-align: center; }");
        html.append(".footer h3 { margin-bottom: 15px; color: #ecf0f1; }");
        html.append(".footer p { color: #bdc3c7; font-size: 14px; line-height: 1.5; }");
        html.append(".social-links { margin-top: 20px; }");
        html.append(".social-links a { color: #ecf0f1; text-decoration: none; margin: 0 10px; font-size: 16px; }");
        html.append(".warning { background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; color: #856404; font-size: 14px; }");
        html.append("@media only screen and (max-width: 600px) {");
        html.append(".container { margin: 10px; }");
        html.append(".content { padding: 20px 15px; }");
        html.append(".header h1 { font-size: 24px; }");
        html.append(".code { font-size: 24px; letter-spacing: 2px; min-width: 150px; }");
        html.append(".feature { margin-bottom: 10px; }");
        html.append("}");
        html.append("</style>");
        html.append("</head>");
        html.append("<body>");
        html.append("<div class=\"container\">");
        html.append("<div class=\"header\">");
        html.append("<h1>🏠 Morando Bem</h1>");
        html.append("<p>Sua jornada para uma vida independente começa aqui!</p>");
        html.append("</div>");
        html.append("<div class=\"content\">");
        html.append("<div class=\"welcome-text\">");
        html.append("<p>🎉 <strong>Parabéns!</strong> Você deu o primeiro passo para uma vida mais independente!</p>");
        html.append("</div>");
        html.append("<div class=\"code-container\">");
        html.append("<div class=\"code-label\">Seu código de confirmação:</div>");
        html.append("<div class=\"code\">").append(codigo).append("</div>");
        html.append("</div>");
        html.append("<div class=\"instructions\">");
        html.append("<h3>�� Como confirmar seu cadastro:</h3>");
        html.append("<ul>");
        html.append("<li>Copie o código acima</li>");
        html.append("<li>Volte ao app Morando Bem</li>");
        html.append("<li>Cole o código na tela de confirmação</li>");
        html.append("<li>Clique em \"Confirmar\"</li>");
        html.append("</ul>");
        html.append("</div>");
        html.append("<div class=\"features\">");
        html.append("<div class=\"feature\">");
        html.append("<div class=\"feature-icon\">🍳</div>");
        html.append("<div class=\"feature-title\">Cozinhar</div>");
        html.append("<div class=\"feature-desc\">Aprenda receitas básicas</div>");
        html.append("</div>");
        html.append("<div class=\"feature\">");
        html.append("<div class=\"feature-icon\">💰</div>");
        html.append("<div class=\"feature-title\">Finanças</div>");
        html.append("<div class=\"feature-desc\">Controle seus gastos</div>");
        html.append("</div>");
        html.append("<div class=\"feature\">");
        html.append("<div class=\"feature-icon\">🧹</div>");
        html.append("<div class=\"feature-title\">Limpeza</div>");
        html.append("<div class=\"feature-desc\">Mantenha a casa organizada</div>");
        html.append("</div>");
        html.append("<div class=\"feature\">");
        html.append("<div class=\"feature-icon\">🔧</div>");
        html.append("<div class=\"feature-title\">Manutenção</div>");
        html.append("<div class=\"feature-desc\">Reparos básicos</div>");
        html.append("</div>");
        html.append("</div>");
        html.append("<div class=\"warning\">");
        html.append("⚠️ <strong>Atenção:</strong> Este código é válido por 24 horas. Se você não solicitou este cadastro, ignore este email.");
        html.append("</div>");
        html.append("</div>");
        html.append("<div class=\"footer\">");
        html.append("<h3>🏠 Morando Bem</h3>");
        html.append("<p>Transformando a experiência de morar sozinho em uma jornada incrível!</p>");
        html.append("<p>Seu parceiro para uma vida independente e organizada.</p>");
        html.append("<div class=\"social-links\">");
        html.append("<a href=\"#\">📧 Suporte</a>");
        html.append("<a href=\"#\">�� App</a>");
        html.append("<a href=\"#\">🌐 Site</a>");
        html.append("</div>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body>");
        html.append("</html>");
        
        return html.toString();
    }
}