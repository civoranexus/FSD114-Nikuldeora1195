import Register from "./pages/auth/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ProtectedRoute from "./components/protected/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
