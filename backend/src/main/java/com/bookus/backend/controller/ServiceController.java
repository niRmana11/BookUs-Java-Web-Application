package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.model.Service;
import com.bookus.backend.repository.ServiceRepository;

@RestController
@RequestMapping("/api/services")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @GetMapping
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @GetMapping("/provider/{providerId}")
    public List<Service> getServicesByProvider(@PathVariable Long providerId) {
        return serviceRepository.findByProvider_Id(providerId);
    }
    
}
