package com.bookus.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.ServiceDTO;
import com.bookus.backend.dto.ServiceResponseDTO;
import com.bookus.backend.model.Category;
import com.bookus.backend.model.Service;
import com.bookus.backend.model.User;
import com.bookus.backend.repository.CategoryRepository;
import com.bookus.backend.repository.ServiceRepository;
import com.bookus.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/services")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody ServiceDTO dto) {
        Optional<Category> categoryOpt = categoryRepository.findById(dto.getCategoryId());
        Optional<User> providerOpt = userRepository.findById(dto.getProviderId());

        if (categoryOpt.isEmpty() || providerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid category or provider ID");
        }

        Service service = new Service();
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setDurationInMinutes(dto.getDurationInMinutes());
        service.setPrice(dto.getPrice());
        service.setCategory(categoryOpt.get());
        service.setProvider(providerOpt.get());

        return ResponseEntity.ok(serviceRepository.save(service));
    }

    @GetMapping
    public List<ServiceResponseDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(service -> new ServiceResponseDTO(
                        service.getId(),
                        service.getName(),
                        service.getDescription(),
                        service.getDurationInMinutes(),
                        service.getPrice(),
                        service.getCategory().getName()))
                .toList();
    }

    @GetMapping("/provider/{providerId}")
    public List<ServiceResponseDTO> getServicesByProvider(@PathVariable Long providerId) {
        return serviceRepository.findByProvider_Id(providerId).stream()
                .map(service -> new ServiceResponseDTO(
                        service.getId(),
                        service.getName(),
                        service.getDescription(),
                        service.getDurationInMinutes(),
                        service.getPrice(),
                        service.getCategory().getName()))
                .toList();
    }
}
