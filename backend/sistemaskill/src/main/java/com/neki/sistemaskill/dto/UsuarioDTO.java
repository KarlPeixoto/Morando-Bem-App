package com.neki.sistemaskill.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioDTO {

    @NotBlank(message="O Login é obrigatório")
    @Size(min=3, max=20, message="Login deve ter entre 3 e 20 caracteres")
    private String login;

    @NotBlank
    @Size(min=6, message="Senha deve ter pelo menos 6 caracteres")
    private String senha;

    @NotBlank
    @Email(message="Email deve ser válido")
    private String email;

    public UsuarioDTO() {
    }

    public UsuarioDTO(
            @NotBlank(message = "O Login é obrigatório") @Size(min = 3, max = 20, message = "Login deve ter entre 3 e 20 caracteres") String login,
            @NotBlank @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres") String senha,
            @NotBlank @Email(message = "Email deve ser válido") String email) {
        this.login = login;
        this.senha = senha;
        this.email = email;
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

    
}
