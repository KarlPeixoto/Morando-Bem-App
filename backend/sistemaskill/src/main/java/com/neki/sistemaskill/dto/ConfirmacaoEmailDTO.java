package com.neki.sistemaskill.dto;

import jakarta.validation.constraints.NotBlank;

public class ConfirmacaoEmailDTO {

    @NotBlank(message="Código de confirmação obrigatório")
    private String codigo;

    public ConfirmacaoEmailDTO() {
    }

    public ConfirmacaoEmailDTO(@NotBlank(message = "Código de confirmação obrigatório") String codigo) {
        this.codigo = codigo;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    
}
