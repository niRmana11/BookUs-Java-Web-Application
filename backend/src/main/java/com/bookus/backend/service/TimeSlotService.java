package com.bookus.backend.service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;


import com.bookus.backend.dto.TimeSlotDTO;
import com.bookus.backend.model.Service;
import com.bookus.backend.model.TimeSlot;
import com.bookus.backend.model.User;
import com.bookus.backend.repository.ServiceRepository;
import com.bookus.backend.repository.TimeSlotRepository;

@org.springframework.stereotype.Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public void createTimeSlots(TimeSlotDTO dto) {
    Optional<Service> optionalService = serviceRepository.findById(dto.getServiceId());

    if (optionalService.isEmpty()) {
        throw new RuntimeException("Service not found");
    }

    Service service = optionalService.get();
    User provider = service.getProvider();
    int duration = service.getDurationInMinutes();

    LocalTime current = dto.getStartTime();
    boolean created = false;

    while (!current.plusMinutes(duration).isAfter(dto.getEndTime())) {
        TimeSlot slot = new TimeSlot();
        slot.setDate(dto.getDate());
        slot.setStartTime(current);
        slot.setEndTime(current.plusMinutes(duration));
        slot.setProvider(provider);
        slot.setService(service);
        slot.setBooked(false);

        timeSlotRepository.save(slot);
        created = true;
        current = current.plusMinutes(duration);
    }

    if (!created) {
        System.out.println("⚠️ No time slots created. Check if startTime + duration > endTime");
    }
}


    // ✅ Get all time slots for a specific service
    public List<TimeSlot> getTimeSlotsByServiceId(Long serviceId) {
        return timeSlotRepository.findByService_Id(serviceId);
    }
    
}
