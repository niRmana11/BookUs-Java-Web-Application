package com.bookus.backend.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.model.Category;
import com.bookus.backend.repository.CategoryRepository;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }
    
}
