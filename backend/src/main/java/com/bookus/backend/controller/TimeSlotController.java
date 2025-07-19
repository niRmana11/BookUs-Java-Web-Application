package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.TimeSlotDTO;
import com.bookus.backend.model.TimeSlot;
import com.bookus.backend.service.TimeSlotService;


@RestController
@RequestMapping("/api/timeslots")
@CrossOrigin
public class TimeSlotController {

    
    @Autowired
    private TimeSlotService timeSlotService;

@GetMapping("/timeslots/service/{serviceId}")
public ResponseEntity<List<TimeSlot>> getTimeSlotsForService(@PathVariable Long serviceId) {
    return ResponseEntity.ok(timeSlotService.getTimeSlotsByServiceId(serviceId));
}



     @PostMapping("/generate")
    public ResponseEntity<String> createTimeSlots(@RequestBody TimeSlotDTO dto) {
        timeSlotService.createTimeSlots(dto);
        return ResponseEntity.ok("Time slots created successfully");
    }
    
}
