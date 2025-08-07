package com.neki.sistemaskill.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neki.sistemaskill.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByLogin(String login);
    
    Optional<Usuario> findByEmail(String email);
    
    Optional<Usuario> findByLoginAndAtivoTrue(String login);
    
    Optional<Usuario> findByEmailAndAtivoTrue(String email);
    
    boolean existsByLogin(String login);
    
    boolean existsByEmail(String email);
}
