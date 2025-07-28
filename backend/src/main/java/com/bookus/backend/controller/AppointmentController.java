package com.bookus.backend.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookus.backend.dto.AppointmentDTO;
import com.bookus.backend.dto.BookingRequestDTO;
import com.bookus.backend.model.Appointment;
import com.bookus.backend.model.AppointmentStatus;
import com.bookus.backend.model.TimeSlot;
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

   @GetMapping("/customer/{customerId}")
   public List<AppointmentDTO> getByCustomer(@PathVariable Long customerId) {
       return appointmentRepository.findDTOsByCustomerId(customerId);
   }

   @GetMapping("/customer/{customerId}/pending")
public ResponseEntity<List<AppointmentDTO>> getPendingAppointments(@PathVariable Long customerId) {
List<Appointment> pending = appointmentRepository.findByCustomer_IdAndStatus(customerId, AppointmentStatus.PENDING);
    List<AppointmentDTO> dtos = pending.stream().map(appt ->
    new AppointmentDTO(
        appt.getId(),
        appt.getCustomer().getName(),
        appt.getService().getName(),
        appt.getTimeSlot().getDate(),
        appt.getTimeSlot().getStartTime(),
        appt.getStatus(),
        appt.getNote()
    )
).toList();

    return ResponseEntity.ok(dtos);
}






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

    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
    try {
Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        TimeSlot slot = appointment.getTimeSlot();
        slot.setBooked(false);
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok("✅ Appointment deleted");
    } catch (Exception e) {
        return ResponseEntity.status(500).body("❌ Error deleting appointment: " + e.getMessage());
    }
}

}
