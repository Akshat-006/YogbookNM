# AI-Powered Yoga Management Platform

## Project Goal

Build a professional single-page yoga platform with dynamic content management, appointment scheduling, paid online classes, AI-powered yoga recommendations, admin dashboard, email notifications, and calendar management.

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* FullCalendar

## Backend

* Python
* FastAPI

## Database

* MongoDB

## AI

* OpenAI API

## Payment

* Razorpay Sandbox

## Email

* SMTP / Resend / SendGrid

---

# Website Sections

Single Page Application containing:

1. Hero Section
2. About Yoga
3. Yoga Benefits
4. Yoga Programs
5. General Yoga Information
6. Testimonials
7. Appointment Booking Section
8. Online Classes Section
9. AI Chatbot Section
10. Contact Section

---

# Top Navigation Buttons

## Book Appointment

Purpose:

* One-on-one consultation

Features:

* Calendar selection
* Slot selection
* Email confirmation
* Meeting link delivery

---

## Join Online Class

Purpose:

* Paid yoga classes

Features:

* Calendar view
* Payment
* Email confirmation
* Meeting link delivery

---

# Dynamic CMS

Admin should be able to edit website content directly from dashboard.

Editable Sections:

* Hero
* About
* Benefits
* Programs
* Testimonials
* General Information

No code editing required.

---

# AI Chatbot

Collect:

* Name
* Age
* Gender
* Fitness Goal
* Health Conditions
* Preferred Yoga Type

Generate:

* Personalized recommendations
* Weekly yoga plan
* Wellness suggestions
* Recommended poses

No authentication required.

Use session management.

---

# Appointment Booking System

Duration:

* 30 minutes

Rules:

* No past dates
* No past times
* No double booking
* One slot can only be booked once

User provides:

* Name
* Email
* Phone

After booking:

* Confirmation email
* Meeting link

Meeting links:

* Google Meet
* Zoom
* Manually added by admin

---

# Appointment Calendar

User Calendar:

* View dates
* View available slots
* Book appointment

Admin Calendar:

* View all appointments
* Manage schedule

Both calendars must stay synchronized.

---

# Online Yoga Classes

Duration:

* 1 hour

Class Fields:

* Title
* Description
* Price
* Date
* Time
* Meeting Link

Features:

* Calendar view
* Enrollment
* Payment
* Email confirmation

---

# Payment System

Gateway:

* Razorpay Sandbox

Flow:
Select Class
→ Pay
→ Payment Success
→ Confirmation Email
→ Meeting Link

---

# Email Notifications

Appointment Booking:

* Date
* Time
* Meeting Link

Class Booking:

* Class Details
* Meeting Link

Admin Notifications:

* New Appointment
* New Enrollment

---

# Admin Dashboard

Modules:

## Content Management

Edit:

* Hero
* Benefits
* Programs
* Testimonials
* General Information

## Appointment Management

* Upcoming Appointments
* Past Appointments
* Cancelled Appointments

## Class Management

* Create Class
* Edit Class
* Delete Class

## Calendar Management

Unified calendar view.

## Analytics (Optional)

* User count
* Popular goals
* Popular yoga types

---

# MongoDB Collections

* admins
* website_content
* appointments
* classes
* payments
* chat_sessions
* users

---

# Performance Requirements

Frontend:

* Lazy Loading
* Code Splitting
* Optimized Images

Backend:

* Async FastAPI
* MongoDB Indexing

Website should be fast and responsive.

---

# Development Roadmap

Current Status:
✅ FastAPI Setup Complete
✅ MongoDB Connection Complete

Next Steps:

1. Database Schema Design
2. Appointment APIs
3. Class APIs
4. CMS APIs
5. Admin APIs
6. Chatbot Session Management
7. OpenAI Integration
8. Email Service
9. Payment Integration
10. Frontend Development

Important
Work module-by-module.
Explain architecture and logic before implementation.
