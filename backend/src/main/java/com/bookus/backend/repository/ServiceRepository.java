package com.bookus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    
}
