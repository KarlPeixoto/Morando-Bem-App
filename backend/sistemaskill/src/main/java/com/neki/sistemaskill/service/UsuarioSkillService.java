package com.neki.sistemaskill.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neki.sistemaskill.dto.SkillAssociacaoDTO;
import com.neki.sistemaskill.model.Skill;
import com.neki.sistemaskill.model.Usuario;
import com.neki.sistemaskill.model.UsuarioSkill;
import com.neki.sistemaskill.repository.SkillRepository;
import com.neki.sistemaskill.repository.UsuarioRepository;
import com.neki.sistemaskill.repository.UsuarioSkillRepository;

@Service
public class UsuarioSkillService {

    @Autowired
    private UsuarioSkillRepository usuarioSkillRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private SkillRepository skillRepository;

    public List<UsuarioSkill> listarSkillsPorUsuario(Long usuarioId) {
        return usuarioSkillRepository.findByUsuarioIdAndAtivoTrue(usuarioId);
    }

    public UsuarioSkill associarSkill(Long usuarioId, SkillAssociacaoDTO associacaoDTO) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        if (!usuario.getAtivo() || !usuario.getEmailConfirmado()) {
            throw new RuntimeException("Usuário não está ativo ou o e-mail ainda não foi confirmado");
        }

        Optional<Skill> skillOpt = skillRepository.findById(associacaoDTO.getSkillId());
        if (skillOpt.isEmpty()) {
            throw new RuntimeException("Skill nãi encontrada");
        }

        Skill skill = skillOpt.get();
        if (!skill.getAtivo()) {
            throw new RuntimeException("Skill não está ativa");
        }

        List<UsuarioSkill> associacoesExistentes = usuarioSkillRepository.findByUsuarioIdAndAtivoTrue(usuarioId);
        for (UsuarioSkill associacao : associacoesExistentes) {
            if (associacao.getSkill().getId().equals(associacaoDTO.getSkillId())) {
                throw new RuntimeException("Usuário já possui esta skill associada");
            }
        }

        UsuarioSkill usuarioSkill = new UsuarioSkill(usuario, skill, associacaoDTO.getLevel());
        return usuarioSkillRepository.save(usuarioSkill);    
    }

    public UsuarioSkill atualizarLevel(Long associacaoId, Integer level) {
        Optional<UsuarioSkill> associacaoOpt = usuarioSkillRepository.findByIdAndAtivoTrue(associacaoId);

        if (associacaoOpt.isEmpty()) {
            throw new RuntimeException("Associação Usuário/Skill não encontrada");
        }

        UsuarioSkill associacao = associacaoOpt.get();
        associacao.setLevel(level);
        associacao.setDataAtualizacao(LocalDateTime.now());

        return usuarioSkillRepository.save(associacao);
    }

    public void excluirAssociacao(Long associacaoId) {
        Optional<UsuarioSkill> associacaoOpt = usuarioSkillRepository.findByIdAndAtivoTrue(associacaoId);
        
        if (associacaoOpt.isEmpty()) {
            throw new RuntimeException("Associação Usuário/Skill não encontrada");
        }

        UsuarioSkill associacao = associacaoOpt.get();
        associacao.setAtivo(false);
        usuarioSkillRepository.save(associacao);
    }
}
