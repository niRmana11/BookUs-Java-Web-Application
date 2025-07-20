package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.BookingRequestDTO;
import com.bookus.backend.model.Appointment;
import com.bookus.backend.repository.AppointmentRepository;
import com.bookus.backend.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody BookingRequestDTO dto) {
        try {
            appointmentService.bookAppointment(dto);
            return ResponseEntity.ok("Appointment booked successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ " + e.getMessage());
        }
    }

    // get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // get appointment by customer id
    @GetMapping("/customer/{customerId}")
    public List<Appointment> getByCustomer(@PathVariable Long customerId) {
        return appointmentRepository.findByCustomer_Id(customerId);
    }

    // get appointment by provider id
    @GetMapping("/provider/{providerId}")
    public List<Appointment> getByProvider(@PathVariable Long providerId) {
        return appointmentRepository.findByProvider_Id(providerId);
    }

}
