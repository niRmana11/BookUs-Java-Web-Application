package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.model.TimeSlot;
import com.bookus.backend.repository.TimeSlotRepository;

@RestController
@RequestMapping("/api/timeslots")
@CrossOrigin
public class TimeSlotController {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @PostMapping
    public TimeSlot addTimeSlot(@RequestBody TimeSlot timeSlot) {
        return timeSlotRepository.save(timeSlot);
    }

    @GetMapping
    public List<TimeSlot> getAllTimeSlots() {
        return timeSlotRepository.findAll();
    }

    @GetMapping("/provider/{providerId}")
    public List<TimeSlot> getTimeSlotsByProvider(@PathVariable Long providerId) {
        return timeSlotRepository.findByProviderId(providerId);
    }

    @GetMapping("/provider/{providerId}/available")
    public List<TimeSlot> getAvailableSlots(@PathVariable Long providerId) {
        return timeSlotRepository.findByProviderIdAndIsBookedFalse(providerId);
    }
    
}
