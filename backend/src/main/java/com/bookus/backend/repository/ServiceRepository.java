package com.bookus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {

    List<Service> findByProvider_Id(Long providerId);

    List<Service> findByCategory_Id(Long categoryId);
    
}
