package com.bookus.backend.dto;
import java.util.List;

import com.bookus.backend.model.TimeSlot;


public class ServiceWithSlotsDTO {

    private Long id;
    private String name;
    private String description;
    private int durationInMinutes;
    private double price;
    private String categoryName;
    private String providerName;
    private List<TimeSlot> availableTimeSlots;

    public ServiceWithSlotsDTO(Long id, String name, String description, int durationInMinutes, double price,
            String categoryName, String providerName, List<TimeSlot> availableTimeSlots) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.durationInMinutes = durationInMinutes;
        this.price = price;
        this.categoryName = categoryName;
        this.providerName = providerName;
        this.availableTimeSlots = availableTimeSlots;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDurationInMinutes() {
        return durationInMinutes;
    }

    public void setDurationInMinutes(int durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public List<TimeSlot> getAvailableTimeSlots() {
        return availableTimeSlots;
    }

    public void setAvailableTimeSlots(List<TimeSlot> availableTimeSlots) {
        this.availableTimeSlots = availableTimeSlots;
    }

    // getters and setters
    
}
    



