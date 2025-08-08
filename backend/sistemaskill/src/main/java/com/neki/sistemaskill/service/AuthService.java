package com.neki.sistemaskill.service;

import com.neki.sistemaskill.dto.LoginDTO;
import com.neki.sistemaskill.dto.TokenResponseDTO;
import com.neki.sistemaskill.model.Usuario;
import com.neki.sistemaskill.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public TokenResponseDTO login(LoginDTO loginDTO) {
        try {
            Usuario usuario = usuarioRepository.findByLoginAndAtivoTrue(loginDTO.getLogin())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado ou não está ativo"));
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getLogin(), loginDTO.getSenha())
            );
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
            String accessToken = jwtService.generateAccessToken(userDetails.getUsername());
            String refreshToken = jwtService.generateRefreshToken(userDetails.getUsername());
            
            return new TokenResponseDTO(accessToken, refreshToken, 900000); // 15 minutos
            
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Login ou senha incorretos");
        } catch (Exception e) {
            throw new RuntimeException("Erro durante o login: " + e.getMessage());
        }
    }
    
    public TokenResponseDTO refreshToken(String refreshToken) {
        if (jwtService.isTokenExpired(refreshToken)) {
            throw new RuntimeException("Refresh token expirado");
        }
        
        String tokenType = jwtService.getTokenType(refreshToken);
        if (!"refresh".equals(tokenType)) {
            throw new RuntimeException("Token inválido");
        }
        
        String username = jwtService.extractUsername(refreshToken);
        Usuario usuario = usuarioRepository.findByLogin(username)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        String newAccessToken = jwtService.generateAccessToken(username);
        String newRefreshToken = jwtService.generateRefreshToken(username);
        
        return new TokenResponseDTO(newAccessToken, newRefreshToken, 900000);
    }
}
