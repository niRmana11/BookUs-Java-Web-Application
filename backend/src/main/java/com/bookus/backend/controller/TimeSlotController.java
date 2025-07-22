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

@GetMapping("/service/{serviceId}")
public ResponseEntity<List<TimeSlotDTO>> getTimeSlotsForService(@PathVariable Long serviceId) {
    List<TimeSlot> timeSlots = timeSlotService.getTimeSlotsByServiceId(serviceId);

    List<TimeSlotDTO> dtos = timeSlots.stream().map(ts -> {
        TimeSlotDTO dto = new TimeSlotDTO();
        dto.setDate(ts.getDate());
        dto.setStartTime(ts.getStartTime());
        dto.setEndTime(ts.getEndTime());
        
        // Safe navigation in case provider or service is lazy loaded or null
        dto.setProviderId(ts.getProvider() != null ? ts.getProvider().getId() : null);
        dto.setServiceId(ts.getService() != null ? ts.getService().getId() : null);
        
        return dto;
    }).toList();

    return ResponseEntity.ok(dtos);
}





     @PostMapping("/generate")
    public ResponseEntity<String> createTimeSlots(@RequestBody TimeSlotDTO dto) {
        timeSlotService.createTimeSlots(dto);
        return ResponseEntity.ok("Time slots created successfully");
    }
    
}
