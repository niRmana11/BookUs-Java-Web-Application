package com.bookus.backend.dto;

public class ServiceResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int durationInMinutes;
    private double price;
    private String categoryName;

    public ServiceResponseDTO(Long id, String name, String description, int durationInMinutes, double price, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.durationInMinutes = durationInMinutes;
        this.price = price;
        this.categoryName = categoryName;
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

    // getters & setters
    
}
