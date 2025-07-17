package com.bookus.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.TimeSlot;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    
}
