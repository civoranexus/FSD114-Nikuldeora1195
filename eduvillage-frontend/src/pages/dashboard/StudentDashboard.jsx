import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";
import { useEffect, useState } from "react";
import { getMyEnrollments } from "../../api/courseApi";


const StudentDashboard = () => {
  usePageTitle("Student Dashboard | EduVillage");

  const { user } = useContext(AuthContext);
const [total, setTotal] = useState(0);
const [completed, setCompleted] = useState(0);

useEffect(() => {
  getMyEnrollments().then((res) => {
    setTotal(res.data.length);
    setCompleted(
      res.data.filter((c) => c.isCompleted).length
    );
  });
}, []);

  return (
    <div>
      <h1>Student Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>
     <p>Total Enrolled Courses: {total}</p>
      <p>Completed Courses: {completed}</p>

      <p>Quick actions:</p>
      <ul>
        <li>
          <Link to="/courses">Browse Courses</Link>
        </li>
        <li>
          <Link to="/my-courses">My Enrolled Courses</Link>
        </li>
      </ul>

      <p>
        Use this dashboard to explore courses and track your learning progress.
      </p>
    </div>
  );
};

export default StudentDashboard;
