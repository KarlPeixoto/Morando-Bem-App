package com.neki.sistemaskill.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.neki.sistemaskill.dto.SkillAssociacaoDTO;
import com.neki.sistemaskill.model.UsuarioSkill;
import com.neki.sistemaskill.service.UsuarioSkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuario-skills")
@CrossOrigin(origins = "*")
public class UsuarioSkillController {

    @Autowired
    private UsuarioSkillService usuarioSkillService;

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> listarSkillsPorUsuario(@PathVariable Long usuarioId) {
        List<UsuarioSkill> skills = usuarioSkillService.listarSkillsPorUsuario(usuarioId);
        return ResponseEntity.ok(skills);
    }

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> associarSkill(@PathVariable Long usuarioId, 
                                         @Valid @RequestBody SkillAssociacaoDTO associacaoDTO) {
        UsuarioSkill usuarioSkill = usuarioSkillService.associarSkill(usuarioId, associacaoDTO);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Skill associada com sucesso!");
        response.put("associacao", usuarioSkill);
        
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{associacaoId}")
    public ResponseEntity<?> atualizarLevel(@PathVariable Long associacaoId,
                                          @RequestParam Integer level) {
        UsuarioSkill usuarioSkill = usuarioSkillService.atualizarLevel(associacaoId, level);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Level atualizado com sucesso!");
        response.put("associacao", usuarioSkill);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{associacaoId}")
    public ResponseEntity<?> excluirAssociacao(@PathVariable Long associacaoId) {
        usuarioSkillService.excluirAssociacao(associacaoId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Associação excluída com sucesso!");
        
        return ResponseEntity.ok(response);
    }
}