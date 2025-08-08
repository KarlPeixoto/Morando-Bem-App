package com.neki.sistemaskill.dto;

import jakarta.validation.constraints.NotBlank;

public class RefreshTokenDTO {
    
    @NotBlank(message = "Refresh token é obrigatório")
    private String refreshToken;
    
    public RefreshTokenDTO() {}
    
    public RefreshTokenDTO(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    
    public String getRefreshToken() {
        return refreshToken;
    }
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
