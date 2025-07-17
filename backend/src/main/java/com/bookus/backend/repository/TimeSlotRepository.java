package com.bookus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookus.backend.model.TimeSlot;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    List<TimeSlot> findByProvider_Id(Long providerId);

    List<TimeSlot> findByProviderIdAndIsBookedFalse(Long providerId);
    
}
