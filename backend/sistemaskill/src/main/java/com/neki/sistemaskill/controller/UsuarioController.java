package com.neki.sistemaskill.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neki.sistemaskill.dto.ConfirmacaoEmailDTO;
import com.neki.sistemaskill.dto.UsuarioDTO;
import com.neki.sistemaskill.model.Usuario;
import com.neki.sistemaskill.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioService.cadastrarUsuario(usuarioDTO);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Usuário cadastrado com sucesso. Verifique seu email para confirmar o cadastro.");
        response.put("login", usuario.getLogin());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirmar-email")
    public ResponseEntity<?> confirmarEmail(@RequestParam String login, 
                                          @Valid @RequestBody ConfirmacaoEmailDTO confirmacaoDTO) {
        usuarioService.confirmarEmail(login, confirmacaoDTO.getCodigo());
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Email confirmado com sucesso!");
        response.put("login", login);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{login}")
    public ResponseEntity<?> buscarUsuario(@PathVariable String login) {
        var usuarioOpt = usuarioService.buscarPorLogin(login);
        
        if (usuarioOpt.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Usuário não encontrado");
            return ResponseEntity.notFound().build();
        }

        Usuario usuario = usuarioOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("id", usuario.getId());
        response.put("login", usuario.getLogin());
        response.put("email", usuario.getEmail());
        response.put("emailConfirmado", usuario.getEmailConfirmado());
        response.put("ativo", usuario.getAtivo());
        
        return ResponseEntity.ok(response);
    }
}