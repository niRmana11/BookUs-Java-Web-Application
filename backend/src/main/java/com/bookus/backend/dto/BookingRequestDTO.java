package com.bookus.backend.dto;

public class BookingRequestDTO {

    private Long customerId;
    private Long providerId;
    private Long serviceId;
    private Long timeSlotId;
    private String note;

    // Constructors
    public BookingRequestDTO() {}

    public BookingRequestDTO(Long customerId, Long providerId, Long serviceId, Long timeSlotId, String note) {
        this.customerId = customerId;
        this.providerId = providerId;
        this.serviceId = serviceId;
        this.timeSlotId = timeSlotId;
        this.note = note;
    }

    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public void setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
