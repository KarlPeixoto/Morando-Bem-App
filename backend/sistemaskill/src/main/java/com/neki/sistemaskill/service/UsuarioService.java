package com.neki.sistemaskill.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.neki.sistemaskill.dto.UsuarioDTO;
import com.neki.sistemaskill.model.Usuario;
import com.neki.sistemaskill.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByLogin(usuarioDTO.getLogin())) {
            throw new RuntimeException("Login já existe");
        }
        if (usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new RuntimeException("E-mail já existe");
        }

        Usuario usuario = new Usuario();
        usuario.setLogin(usuarioDTO.getLogin());
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setEmailConfirmado(false);
        usuario.setAtivo(false);

        String codigoConfirmacao = gerarCodigoConfirmacao();
        usuario.setCodigoConfirmacao(codigoConfirmacao);

        usuario = usuarioRepository.save(usuario);

        emailService.enviarCodigoConfirmacao(usuario.getEmail(), codigoConfirmacao);

        return usuario;
    }

    private String gerarCodigoConfirmacao() {
        Random random = new Random();
        int codigo = 100000 + random.nextInt(900000);
        return String.valueOf(codigo);
    }

    public void confirmarEmail(String login, String codigo) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLogin(login);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();

        if (usuario.getEmailConfirmado()) {
            throw new RuntimeException("E-mail já confirmado");
        }

        if (!codigo.equals(usuario.getCodigoConfirmacao())){
            throw new RuntimeException("Código de confirmação inválido");
        }

        usuario.setEmailConfirmado(true);
        usuario.setAtivo(true);
        usuario.setDataConfirmacao(LocalDateTime.now());
        usuario.setCodigoConfirmacao(null);

        usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorLogin(String login) {
        return usuarioRepository.findByLoginAndAtivoTrue(login);
    }
}
