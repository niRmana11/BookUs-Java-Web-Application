package com.bookus.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.bookus.backend.dto.BookingRequestDTO;
import com.bookus.backend.model.Appointment;
import com.bookus.backend.model.AppointmentStatus;
import com.bookus.backend.model.Service;
import com.bookus.backend.model.TimeSlot;
import com.bookus.backend.model.User;
import com.bookus.backend.repository.AppointmentRepository;
import com.bookus.backend.repository.ServiceRepository;
import com.bookus.backend.repository.TimeSlotRepository;
import com.bookus.backend.repository.UserRepository;

@org.springframework.stereotype.Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public void bookAppointment(BookingRequestDTO dto) {
        Optional<User> customerOpt = userRepository.findById(dto.getCustomerId());
        Optional<User> providerOpt = userRepository.findById(dto.getProviderId());
        Optional<Service> serviceOpt = serviceRepository.findById(dto.getServiceId());
        Optional<TimeSlot> timeSlotOpt = timeSlotRepository.findById(dto.getTimeSlotId());

        if (customerOpt.isEmpty() || providerOpt.isEmpty() || serviceOpt.isEmpty() || timeSlotOpt.isEmpty()) {
            throw new RuntimeException("Invalid booking data.");
        }

        TimeSlot slot = timeSlotOpt.get();
        if (slot.isBooked()) {
            throw new RuntimeException("Time slot already booked.");
        }

        Appointment appointment = new Appointment();
        appointment.setCustomer(customerOpt.get());
        appointment.setProvider(providerOpt.get());
        appointment.setService(serviceOpt.get());
        appointment.setTimeSlot(slot);
        appointment.setStatus(AppointmentStatus.PENDING); // or CONFIRMED

        appointmentRepository.save(appointment);

        // Mark slot as booked
        slot.setBooked(true);
        timeSlotRepository.save(slot);
    }

}
