package com.bookus.backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Optional: One user can have multiple appointments as a customer
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Appointment> customerAppointments;

    // Optional: One user can have multiple appointments as a provider
    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    private List<Appointment> providerAppointments;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Appointment> getCustomerAppointments() {
        return customerAppointments;
    }

    public void setCustomerAppointments(List<Appointment> customerAppointments) {
        this.customerAppointments = customerAppointments;
    }

    public List<Appointment> getProviderAppointments() {
        return providerAppointments;
    }

    public void setProviderAppointments(List<Appointment> providerAppointments) {
        this.providerAppointments = providerAppointments;
    }

   

}

