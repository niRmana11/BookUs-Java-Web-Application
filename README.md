# 📅 BookUs – Appointment Booking & Management System

**BookUs** is a full-stack appointment booking and management platform designed to streamline the process of scheduling services between providers and customers.

Providers can manage services and time slots, while customers can easily book appointments, update their details, and track bookings — all through an intuitive and professional web interface.

## Technologies Used

- **Frontend:** React.js, Bootstrap 5, Axios – For API integration, React Router – For routing
- **Backend:** Java 22, Spring Boot, Spring Data JPA, Hibernate, MySQL (using MySQL Workbench)
- **Database:** MySQL
- **Tools:** VS Code, Postman, Spring DevTools, Git & GitHub, MySQL Workbench

---

## ✨ Key Features

### Customer Features
- Browse Services by Category: Easily explore services grouped under relevant categories.
- Book Appointments: Select preferred date and time from available slots.
- Edit or Cancel Pending Appointments: Modify notes or reschedule with a few clicks.
- View Appointment History: Stay updated with current, past, and pending bookings.
- Profile Management: Update name, email, and password securely.

### Provider Features
- Create & Manage Services: Add services with price, duration, and category.
- Generate Time Slots: Automatically generate time slots based on service duration.
- Edit & Delete Services: Update service details or remove services completely.
- Manage Appointments: Confirm or complete bookings with status updates.
- Profile Management: Update personal and login details.

### Technical Highlights
- Authentication: Local storage-based login system.
- Dynamic Scheduling: Time slots generated based on provider’s input and service duration.
- Modern UI: Clean layout with consistent colors, gradients, and responsive design.
- Role-Based Dashboards: Separate experiences for customers and providers.
- Appointment Statuses: Track appointments via status badges (Pending, Confirmed, Completed, Cancelled).


---

## User Interfaces
### Landing Page
<img width="1918" height="867" alt="home" src="https://github.com/user-attachments/assets/0caf5540-463c-4e0d-9ed7-dff3ec04aaad" />

### Login Page
<img width="1918" height="860" alt="login" src="https://github.com/user-attachments/assets/4c8b57d4-e4a4-45e3-8d87-86957fba9f56" />

### Register Page
<img width="1918" height="863" alt="register" src="https://github.com/user-attachments/assets/76c9c893-1670-49f3-a88a-2c7a32821561" />

### Customer Dashboard Page
<img width="1918" height="862" alt="customer dashboard" src="https://github.com/user-attachments/assets/34fbf756-03d3-4500-8798-c0101e395923" />

### Browse Service Page
<img width="1918" height="862" alt="browse" src="https://github.com/user-attachments/assets/b24a3f88-f12c-4a73-bd93-ce59d42e38a8" />

### Customer Profile Page
<img width="1918" height="863" alt="customer profile" src="https://github.com/user-attachments/assets/81e91c4d-2a35-4635-8fa0-3d5bd8beb14c" />

### Provider Dashboard Page
<img width="1918" height="862" alt="provider dashboard" src="https://github.com/user-attachments/assets/5db138f1-322b-4d72-9ff3-6d3b152856fb" />

### Create Service Page
<img width="1918" height="862" alt="create service" src="https://github.com/user-attachments/assets/faad5d1a-b926-4f64-8c2f-b84a687f1aa3" />

### Appointments Page
<img width="1918" height="863" alt="appointments" src="https://github.com/user-attachments/assets/48f6fd23-6293-4948-a259-a5baf7cd47e5" />

### Provider Profile Page
<img width="1918" height="862" alt="provider profile" src="https://github.com/user-attachments/assets/614d21cd-2290-4582-b284-6feba9ffe698" />

---

## 📂 Project Structure

```text

Backend (Java Spring Boot)
├── controller
│   ├── AppointmentController.java
│   ├── AuthController.java
│   ├── CategoryController.java
│   ├── ServiceController.java
│   ├── TimeSlotController.java
│   └── UserController.java
├── dto
│   ├── AppointmentDTO.java
│   ├── ServiceDTO.java
│   └── TimeSlotDTO.java
├── model
│   ├── Appointment.java
│   ├── Category.java
│   ├── Service.java
│   ├── TimeSlot.java
│   └── User.java
└── repository
    ├── AppointmentRepository.java
    ├── CategoryRepository.java
    ├── ServiceRepository.java
    ├── TimeSlotRepository.java
    └── UserRepository.java

Frontend (React)
├── pages
   ├── Login.js
   ├── Register.js
   ├── ProviderDashboard.js
   ├── CustomerDashboard.js
   ├── CreateService.js
   ├── BrowseServices.js
   ├── ProviderAppointments.js
   ├── CustomerProfile.js
   └── ProviderProfile.js
   └── CreateService.js



```












