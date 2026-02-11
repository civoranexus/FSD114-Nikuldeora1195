import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddSection from "./pages/course/AddSection";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import Announcements from "./pages/student/Announcements";
import CreateAnnouncement from "./pages/teacher/CreateAnnouncement";
import CreateCourse from "./pages/teacher/CreateCourse";
import EditCourse from "./pages/teacher/EditCourse";

import CourseList from "./pages/student/CourseList";
import MyCourses from "./pages/student/MyCourses";
import TeacherCourses from "./pages/teacher/MyCourses";
import NotFound from "./pages/NotFound";

import CourseDetail from "./pages/student/CourseDetail";
import CourseContent from "./pages/course/CourseContent";
import ProtectedRoute from "./components/protected/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";

import Students from "./pages/teacher/Students";

import Certificate from "./pages/student/Certificate";






function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ROUTES (NO NAVBAR) ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= APP ROUTES (WITH NAVBAR) ================= */}
        <Route
          path="/*"
          element={
            <>
              <Routes>
                {/* Student routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["student"]}>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute allowedRoles={["student"]}>
                      <CourseList />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/my-courses"
                  element={
                    <ProtectedRoute allowedRoles={["student"]}>
                      <MyCourses />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/announcements"
                  element={
                    <ProtectedRoute allowedRoles={["student", "teacher"]}>
                      <Announcements />
                    </ProtectedRoute>
                  }
                />

                {/* Teacher routes */}
                <Route
                  path="/teacher/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                      <TeacherDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/teacher/courses"
                  element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                      <TeacherCourses />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/teacher/announcements/create"
                  element={
                    <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                      <CreateAnnouncement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/courses/:id"
                  element={
                    <ProtectedRoute allowedRoles={["student", "teacher"]}>
                      <CourseDetail />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/teacher/courses/create"
                  element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                      <CreateCourse />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/teacher/courses/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["teacher"]}>
                      <EditCourse />
                    </ProtectedRoute>
                  }
                />

              

       <Route
  path="/courses/:courseId/content"
  element={
    <ProtectedRoute allowedRoles={["teacher", "student"]}>
      <CourseContent />
    </ProtectedRoute>
  }
/>


<Route
  path="/courses/:courseId/add-section"
  element={
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AddSection />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>


<Route 
path="/admin/courses" 
element={
<ProtectedRoute allowedRoles={["admin"]}>
  <AdminCourses />
  </ProtectedRoute>
} />


// In your Routes
<Route path="/teacher/students" element={
  <ProtectedRoute allowedRoles={["teacher"]}>
  <Students />
  </ProtectedRoute>} />


<Route path="/certificate/:courseTitle" element={<Certificate />} />


                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
