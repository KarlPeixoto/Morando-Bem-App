package com.neki.sistemaskill.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Column(unique=true)
    private String login;

    @NotNull
    private String senha;

    @Email
    @NotNull
    @Column(unique=true)
    private String email;

    @Column(name="codigo_confirmacao")
    private String codigoConfirmacao;

    @Column(name="email_confirmado")
    private Boolean emailConfirmado = false;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @Column(name = "data_confirmacao")
    private LocalDateTime dataConfirmacao;

    @Column(name = "ativo")
    private Boolean ativo = true;

    public Usuario() {
        this.dataCriacao = LocalDateTime.now();
    }
  
    public Usuario(@NotNull String login, @NotNull String senha, @Email @NotNull String email) {
        this.login = login;
        this.senha = senha;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodigoConfirmacao() {
        return codigoConfirmacao;
    }

    public void setCodigoConfirmacao(String codigoConfirmacao) {
        this.codigoConfirmacao = codigoConfirmacao;
    }

    public Boolean getEmailConfirmado() {
        return emailConfirmado;
    }

    public void setEmailConfirmado(Boolean emailConfirmado) {
        this.emailConfirmado = emailConfirmado;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataConfirmacao() {
        return dataConfirmacao;
    }

    public void setDataConfirmacao(LocalDateTime dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    
}