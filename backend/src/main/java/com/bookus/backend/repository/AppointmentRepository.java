package com.bookus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.Appointment;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByCustomerId(Long customerId);
    List<Appointment> findByProvider(Long providerId);
    
}
