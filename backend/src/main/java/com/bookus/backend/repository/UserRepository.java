package com.bookus.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.bookus.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
