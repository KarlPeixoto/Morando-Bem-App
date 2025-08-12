package com.neki.sistemaskill.controller;

import com.neki.sistemaskill.dto.LoginDTO;
import com.neki.sistemaskill.dto.RefreshTokenDTO;
import com.neki.sistemaskill.dto.TokenResponseDTO;
import com.neki.sistemaskill.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@Tag(name = "Autenticação", description = "Endpoints para autenticação e gerenciamento de tokens")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(
        summary = "Realizar login",
        description = "Autentica um usuário e retorna tokens de acesso e refresh"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = TokenResponseDTO.class),
                examples = @ExampleObject(
                    value = "{\"accessToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\", \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\", \"expiresIn\": 900000}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Credenciais inválidas",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    value = "{\"error\": \"Login ou senha incorretos\"}"
                )
            )
        )
    })
    public ResponseEntity<?> login(
        @Parameter(description = "Dados de login", required = true)
        @Valid @RequestBody LoginDTO loginDTO
    ) {
        try {
            TokenResponseDTO response = authService.login(loginDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/refresh")
    @Operation(
        summary = "Renovar token",
        description = "Renova o token de acesso usando o refresh token"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Token renovado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = TokenResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Refresh token inválido",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    value = "{\"error\": \"Refresh token inválido\"}"
                )
            )
        )
    })
    public ResponseEntity<?> refreshToken(
        @Parameter(description = "Refresh token", required = true)
        @Valid @RequestBody RefreshTokenDTO refreshTokenDTO
    ) {
        try {
            TokenResponseDTO response = authService.refreshToken(refreshTokenDTO.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/logout")
    @Operation(
        summary = "Realizar logout",
        description = "Endpoint para logout (client-side deve limpar os tokens)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Logout realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    value = "{\"message\": \"Logout realizado com sucesso\"}"
                )
            )
        )
    })
    public ResponseEntity<?> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout realizado com sucesso");
        return ResponseEntity.ok(response);
    }
}