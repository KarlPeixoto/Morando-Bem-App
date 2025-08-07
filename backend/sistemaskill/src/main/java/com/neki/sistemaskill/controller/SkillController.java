package com.neki.sistemaskill.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RestController;

import com.neki.sistemaskill.dto.SkillDTO;
import com.neki.sistemaskill.model.Skill;
import com.neki.sistemaskill.service.SkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @PostMapping
    public ResponseEntity<Skill> criarSkill(@Valid @RequestBody SkillDTO dto) {
        return ResponseEntity.ok(skillService.criarSkill(dto));
    }

    @GetMapping
    public ResponseEntity<List<Skill>> listarSkills() {
        return ResponseEntity.ok(skillService.listarSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> buscarPorId(@PathVariable Long id) {
        Optional<Skill> skillOpt = skillService.buscarPorId(id);
        if (skillOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(skillOpt.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> atualizarSkill(@PathVariable Long id, @Valid @RequestBody SkillDTO dto) {
        return ResponseEntity.ok(skillService.atualizarSkill(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarSkill(@PathVariable Long id) {
        skillService.deletarSkill(id);
        return ResponseEntity.noContent().build();
    }
}