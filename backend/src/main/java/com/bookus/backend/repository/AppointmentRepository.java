package com.bookus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
}
