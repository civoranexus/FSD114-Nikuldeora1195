
# 🎓 EduVillage – Online Learning Platform

**EduVillage** is a professional-grade, full-stack Online Learning Management System (LMS) built using the MERN stack. Designed with a focus on clean architecture and secure role-based access, it mirrors the student and instructor workflows found on industry-leading platforms like Coursera and Udemy.

Live : eduvillage-fsd114.vercel.app
---

## 🚀 Project Status
* **Stage:** Active Development
* **Frontend:** Integrated & Responsive
* **Backend:** Stable API with Middleware Protection
* **Authentication:** JWT + Role-Based Access Control (RBAC)
* **UI/UX:** Modern, Coursera-inspired design (Student Learning Flow completed)

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, Axios, Context API, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose (ODM) |
| **Security** | JWT, Bcrypt.js, RBAC Middleware |
| **Feedback** | React Hot Toast |

---

## 👥 User Roles & Permissions

EduVillage employs a strict **Role-Based Access Control (RBAC)** system to ensure data integrity and security.

* **👩‍🎓 Student:** Can register/login, browse published courses, enroll, track course progress, and view announcements.
* **👨‍🏫 Teacher:** Can create courses, manage curriculum (sections/lessons), and broadcast announcements.
* **🛡️ Admin:** (Future Scope) System-wide oversight, user management, and platform analytics.

---

## 📚 Core Features

### 👩‍🎓 Student Experience
* **Dashboard:** View enrolled courses at a glance with visual progress bars and completion badges.
* **Structured Learning:** Seamless transition between lessons within a multi-section content view.
* **My Learning:** Dedicated space for tracking active enrollments and "Continue Learning" functionality.
* **Announcements:** Stay updated with course-specific news directly from the instructors.

### 👨‍🏫 Teacher Experience
* **Course Builder:** Comprehensive tools to create and edit course metadata (titles, descriptions).
* **Curriculum Management:** Hierarchical structure involving **Sections** and **Lessons**.
* **Content Control:** Lessons support detailed text-based instruction with optional image URL integration.
* **Ownership Protection:** Backend guards ensure only the original course creator can modify or delete content.

---

## 🗂 Project Structure

### 🖥️ Backend (`/backend`)
```text
├── config/         # Database connection (db.js)
├── controllers/    # Logical processing for routes (Auth, Course, Enrollment, etc.)
├── middleware/     # JWT Auth & Role-based validation guards
├── models/         # Mongoose schemas (User, Course, Section, Lesson, etc.)
├── routes/         # Express route definitions
└── server.js       # Entry point

```

### 💻 Frontend (`/src`)

```text
├── api/            # Axios instance and centralized API calls
├── components/     # UI components (app, ui, protected routes)
├── context/        # Global state management (AuthContext)
├── pages/          # View components (Student, Teacher, Auth, Dashboard)
├── utils/          # Helper functions and constants
└── App.jsx         # Main route configuration

```

---

## 🧭 Key Routes

| Entity | Route | Description |
| --- | --- | --- |
| **Auth** | `/login`, `/register` | Secure onboarding flow |
| **Student** | `/dashboard`, `/my-courses` | Personal learning overview |
| **Teacher** | `/teacher/courses/create` | Course initialization wizard |
| **Content** | `/courses/:courseId/content` | Lesson viewer & management |

---

## 🔐 Security & Design Decisions

* **Atomic Management:** Course creation is decoupled from content management to allow for a focused, scalable editing experience.
* **Defensive API Design:** Implemented backend validation for `ObjectIds` and unauthorized access attempts to prevent data leakage.
* **State Management:** Secure JWT storage combined with React Context API for persistent user authentication.
* **Scalable UI:** Designed using Tailwind CSS for a fully responsive experience across mobile, tablet, and desktop.

---

## 🏁 How to Run Locally

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/eduvillage.git](https://github.com/your-username/eduvillage.git)

```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file and add your MONGO_URI and JWT_SECRET
npm run dev

```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev

```


---



Student Pages:

Dashboard - Welcome, stats, continue learning
Course List - Browse and enroll in courses
My Courses - Track progress, update completion
Announcements - View timeline of updates

Teacher Pages:

Dashboard - Analytics, performance charts, overview
My Courses - Manage, publish, edit courses


File	                Description
TeacherDashboard.jsx	Light modern dashboard redesign
MyCourses.jsx (Teacher)	Light card-based course management UI
CreateAnnouncement.jsx	Clean and modern announcement creation page


**Developed as part of a Full-Stack Development Internship Project.**
*Built with best practices for the MERN stack and clean code architecture.*

