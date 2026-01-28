import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#142C52] px-6 py-4 flex items-center justify-between shadow-md">
      {/* Brand */}
      <Link
        to={user?.role === "teacher" ? "/teacher/dashboard" : "/dashboard"}
        className="text-white font-semibold text-lg"
      >
        EduVillage
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-white text-sm">
        {user?.role === "student" && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/courses" className="hover:underline">
              Courses
            </Link>
            <Link to="/my-courses" className="hover:underline">
              My Learning
            </Link>
            <Link to="/announcements" className="hover:underline">
              Announcements
            </Link>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Link to="/teacher/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/teacher/courses" className="hover:underline">
              My Courses
            </Link>
            <Link
              to="/teacher/announcements/create"
              className="hover:underline"
            >
              Create Announcement
            </Link>
          </>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-white text-[#142C52] px-4 py-1 rounded-md font-medium hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
