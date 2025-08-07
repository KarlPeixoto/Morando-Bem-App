package com.neki.sistemaskill.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillDTO {
    
    @NotBlank(message = "Nome da skill é obrigatório")
    private String nome;

    private String descricao;  
    
    public SkillDTO() {
    }
    
    public SkillDTO(@NotBlank(message = "Nome da skill é obrigatório") String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}