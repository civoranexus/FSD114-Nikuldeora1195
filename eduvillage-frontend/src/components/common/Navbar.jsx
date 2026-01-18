import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ marginBottom: "20px" }}>
      {user ? (
        <>
          {user.role === "student" && (
            <>
              <Link to="/dashboard">Dashboard</Link>{" "}
              <Link to="/courses">Courses</Link>{" "}
              <Link to="/my-courses">My Courses</Link>{" "}
            </>
          )}

          {user.role === "teacher" && (
            <>
              <Link to="/teacher/dashboard">Dashboard</Link>{" "}
              <Link to="/teacher/courses">My Courses</Link>{" "}
              <Link to="/teacher/announcements/create">
  Create Announcement
</Link>{" "}

            </>
          )}

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>{" "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
