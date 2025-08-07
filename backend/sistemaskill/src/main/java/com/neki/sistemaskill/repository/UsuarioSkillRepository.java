package com.neki.sistemaskill.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neki.sistemaskill.model.UsuarioSkill;

@Repository
public interface UsuarioSkillRepository extends JpaRepository<UsuarioSkill, Long> {

    List<UsuarioSkill> findByUsuarioIdAndAtivoTrue(Long usuarioId);
    
    List<UsuarioSkill> findByUsuarioId(Long usuarioId);
    
    Optional<UsuarioSkill> findByIdAndAtivoTrue(Long id);
}
