package com.neki.sistemaskill.service;

import com.neki.sistemaskill.dto.SkillDTO;
import com.neki.sistemaskill.model.Skill;
import com.neki.sistemaskill.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public Skill criarSkill(SkillDTO dto) {
        Optional<Skill> skillExistente = skillRepository.findByNomeAndAtivoTrue(dto.getNome());
        if (skillExistente.isPresent()) {
            throw new RuntimeException("Já existe essa skill");
        }

        Skill skill = new Skill();
        skill.setNome(dto.getNome());
        skill.setDescricao(dto.getDescricao());
        skill.setAtivo(true);
        return skillRepository.save(skill);
    }

    public List<Skill> listarSkills() {
        return skillRepository.findByAtivoTrue();
    }

    public Optional<Skill> buscarPorId(Long id) {
        return skillRepository.findById(id);
    }

    public Skill atualizarSkill(Long id, SkillDTO dto) {
        Optional<Skill> skillOpt = skillRepository.findById(id);
        if (skillOpt.isEmpty()) {
            throw new RuntimeException("Skill não encontrada");
        }
        
        Skill skill = skillOpt.get();
        
        Optional<Skill> skillComMesmoNome = skillRepository.findByNomeAndAtivoTrue(dto.getNome());
        if (skillComMesmoNome.isPresent() && !skillComMesmoNome.get().getId().equals(id)) {
            throw new RuntimeException("Já existe essa skill");
        }
        
        skill.setNome(dto.getNome());
        skill.setDescricao(dto.getDescricao());
        return skillRepository.save(skill);
    }

    public void deletarSkill(Long id) {
        Optional<Skill> skillOpt = skillRepository.findById(id);
        if (skillOpt.isEmpty()) {
            throw new RuntimeException("Skill não encontrada");
        }
        
        Skill skill = skillOpt.get();
        skill.setAtivo(false);
        skillRepository.save(skill);
    }
}