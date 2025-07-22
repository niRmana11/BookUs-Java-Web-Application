package com.bookus.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.bookus.backend.model.AppointmentStatus;

public class AppointmentDTO {
    private Long id;
    private String customerName;
    private String serviceName;
    private String date;
    private String time;
    private String status;
    private String note;

    

     public AppointmentDTO(Long id, String customerName, String serviceName, 
                          LocalDate date, LocalTime time, 
                          AppointmentStatus status, String note) {
        this.id = id;
        this.customerName = customerName;
        this.serviceName = serviceName;
        this.date = (date != null) ? date.toString() : "";
        this.time = (time != null) ? time.toString() : "";
        this.status = (status != null) ? status.name() : "";
        this.note = note;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getServiceName() {
        return serviceName;
    }
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }

    
}
