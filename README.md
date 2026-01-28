📘 EduVillage – Online Learning Platform

EduVillage is a full-stack MERN-based online learning platform built as part of the CivoraX Internship Program (25-day timeline).
The project follows an industry-style, backend-first development approach with a strong focus on clean architecture, authentication, and real-world workflows.

🚀 Tech Stack

Frontend

React (Vite)

React Router

Axios

Context API

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

bcrypt

CORS

✅ Project Status (Till Day 7)
🔐 Authentication & Authorization

User roles: Student, Teacher, Admin

Register & Login functionality

Password hashing using bcrypt

JWT-based authentication

Global auth state using React Context

Auto-login protection with protected routes

Role-based route access (RBAC)

Students cannot access teacher routes

Teachers cannot access student routes

🧭 Frontend Routing & Structure

Proper React folder structure (pages, components, api, context)

Public routes: Login, Register

Protected routes:

Student Dashboard

Teacher Dashboard

Automatic redirect after login based on role

Logout functionality implemented

🎓 Courses & Enrollment (Student)

View all published courses

Enroll in a course

Prevent duplicate enrollment

View My Enrolled Courses

Track progress (0–100%)

👨‍🏫 Teacher Features

View courses created by the teacher

Teacher-specific dashboard access

Backend-ready structure for course creation & publishing

🔔 Notifications & Announcements (Backend Ready)

Teacher/Admin can create announcements

Students can view announcements

Frontend integration planned

🧹 Code Quality & Best Practices

Centralized error handling

Input validation

Clean API separation (frontend ↔ backend)

Loading and error states in UI

Logical, feature-based Git commits

Beginner-friendly but industry-aligned architecture

📂 Project Structure (Frontend)
      src/
      ├── api/
      │   ├── axiosInstance.js
      │   ├── authApi.js
      │   └── courseApi.js
      │
      ├── components/
      │   ├── common/
      │   │   └── Navbar.jsx
      │   └── protected/
      │       └── ProtectedRoute.jsx
      │
      ├── context/
      │   ├── AuthContext.js
      │   └── AuthProvider.jsx
      │
      ├── pages/
      │   ├── auth/
      │   │   ├── Login.jsx
      │   │   └── Register.jsx
      │   │
      │   ├── dashboard/
      │   │   ├── StudentDashboard.jsx
      │   │   └── TeacherDashboard.jsx
      │   │
      │   └── student/
      │       ├── CourseList.jsx
      │       └── MyCourses.jsx
      │
      ├── App.jsx
      └── main.jsx

🧪 How to Run Locally
Backend
npm install
npm run dev

Frontend
npm install
npm run dev


Make sure backend runs on port 5000 and frontend on port 5173.

## ✅ Current Status
Frontend and backend authentication, role-based dashboards, course management, and student progress tracking are fully implemented. The project is stable and ready for further enhancements or deployment.


