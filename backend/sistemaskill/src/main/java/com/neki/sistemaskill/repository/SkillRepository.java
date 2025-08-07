package com.neki.sistemaskill.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neki.sistemaskill.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByAtivoTrue();

    Optional<Skill> findByNomeAndAtivoTrue(String nome);
}
