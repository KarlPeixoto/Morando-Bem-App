package com.neki.sistemaskill.dto;

public class LoginResponseDTO {
    private String token;
    private String login;
    private String email;
    private Boolean emailConfirmado;
    
    public LoginResponseDTO() {}
    
    public LoginResponseDTO(String token, String login, String email, Boolean emailConfirmado) {
        this.token = token;
        this.login = login;
        this.email = email;
        this.emailConfirmado = emailConfirmado;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getLogin() {
        return login;
    }
    
    public void setLogin(String login) {
        this.login = login;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Boolean getEmailConfirmado() {
        return emailConfirmado;
    }
    
    public void setEmailConfirmado(Boolean emailConfirmado) {
        this.emailConfirmado = emailConfirmado;
    }
}
