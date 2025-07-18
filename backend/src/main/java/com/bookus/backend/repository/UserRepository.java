package com.bookus.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookus.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndPassword(String email, String password);
    
}
