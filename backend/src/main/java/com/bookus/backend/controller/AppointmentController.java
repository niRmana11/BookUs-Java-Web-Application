package com.bookus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.model.Appointment;
import com.bookus.backend.repository.AppointmentRepository;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // create an appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // get appointment by customer id
    @GetMapping("/customer/{customerId}")
    public List<Appointment> getByCustomer(@PathVariable Long customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }

    // get appointment by provider id
    @GetMapping("/provider/{providerId}")
    public List<Appointment> getByProvider(@PathVariable Long providerId) {
        return appointmentRepository.findByProvider(providerId);
    }
    
}
