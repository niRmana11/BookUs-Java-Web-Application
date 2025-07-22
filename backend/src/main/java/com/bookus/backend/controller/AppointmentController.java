package com.bookus.backend.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.AppointmentDTO;
import com.bookus.backend.dto.BookingRequestDTO;
import com.bookus.backend.model.Appointment;
import com.bookus.backend.model.AppointmentStatus;
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

   @GetMapping("/provider/{providerId}")
public List<AppointmentDTO> getByProvider(@PathVariable Long providerId) {
    return appointmentRepository.findDTOsByProviderId(providerId);
}


    // Optional: keep full entity version for customer if needed
// @GetMapping("/customer/{customerId}")
// public List<AppointmentDTO> getByCustomer(@PathVariable Long customerId) {
//     List<Appointment> appointments = appointmentRepository.findByCustomer_Id(customerId);

//     return appointments.stream().map(app -> {
//         AppointmentDTO dto = new AppointmentDTO();
//         dto.setId(app.getId());
//         dto.setCustomerName(app.getCustomer() != null ? app.getCustomer().getName() : "N/A");
//         dto.setServiceName(app.getService() != null ? app.getService().getName() : "N/A");
//         dto.setDate(app.getTimeSlot() != null ? app.getTimeSlot().getDate().toString() : "");
//         dto.setTime(app.getTimeSlot() != null ? app.getTimeSlot().getStartTime().toString() : "");
//         dto.setStatus(app.getStatus().name());
//         dto.setNote(app.getNote());
//         return dto;
//     }).collect(Collectors.toList());
// }


    // Update appointment status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable("id") Long appointmentId,
            @RequestBody String status
    ) {
        try {
            String cleanStatus = status.replace("\"", ""); // if JSON string wrapped in quotes
            Appointment appointment = appointmentRepository.findById(appointmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found"));

            AppointmentStatus newStatus = AppointmentStatus.valueOf(cleanStatus.toUpperCase());
            appointment.setStatus(newStatus);
            appointmentRepository.save(appointment);

            return ResponseEntity.ok("✅ Status updated to " + newStatus.name());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("❌ Invalid status value");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error: " + e.getMessage());
        }
    }
}
