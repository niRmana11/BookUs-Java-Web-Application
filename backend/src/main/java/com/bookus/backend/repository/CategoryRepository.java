package com.bookus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
