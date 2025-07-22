package com.bookus.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookus.backend.dto.AppointmentDTO;
import com.bookus.backend.model.Appointment;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByCustomer_Id(Long customerId);
    
    @Query("SELECT new com.bookus.backend.dto.AppointmentDTO(" +
           "a.id, c.name, s.name, ts.date, ts.startTime, a.status, a.note) " +
           "FROM Appointment a " +
           "LEFT JOIN a.customer c " +
           "LEFT JOIN a.service s " +
           "LEFT JOIN a.timeSlot ts " +
           "WHERE a.provider.id = :providerId")
    List<AppointmentDTO> findDTOsByProviderId(@Param("providerId") Long providerId);
    
}
