package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.TimeSlotDTO;
import com.bookus.backend.model.TimeSlot;
import com.bookus.backend.repository.TimeSlotRepository;
import com.bookus.backend.service.TimeSlotService;


@RestController
@RequestMapping("/api/timeslots")
@CrossOrigin
public class TimeSlotController {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private TimeSlotService timeSlotService;

    @GetMapping("/provider/{providerId}")
    public List<TimeSlot> getTimeSlotsByProvider(@PathVariable Long providerId) {
        return timeSlotRepository.findByProvider_Id(providerId);
    }

     @PostMapping("/generate")
    public ResponseEntity<String> createTimeSlots(@RequestBody TimeSlotDTO dto) {
        timeSlotService.createTimeSlots(dto);
        return ResponseEntity.ok("Time slots created successfully");
    }
    
}
