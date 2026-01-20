import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-navy shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <img
          src="/Long_logo.png"
          alt="Civora Nexus"
          className="h-9"
        />

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-white">
          {user?.role === "student" && (
            <>
              <Link className="hover:text-primary" to="/dashboard">Dashboard</Link>
              <Link className="hover:text-primary" to="/courses">Courses</Link>
              <Link className="hover:text-primary" to="/my-courses">My Learning</Link>
              <Link className="hover:text-primary" to="/announcements">Announcements</Link>
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <Link className="hover:text-primary" to="/teacher/dashboard">Dashboard</Link>
              <Link className="hover:text-primary" to="/teacher/courses">Courses</Link>
              <Link className="hover:text-primary" to="/teacher/announcements/create">Announcements</Link>
            </>
          )}

          {!user && (
            <>
              <Link className="hover:text-primary" to="/login">Login</Link>
              <Link className="hover:text-primary" to="/register">Register</Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="bg-primaryDark px-4 py-2 rounded-md hover:bg-primary transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
