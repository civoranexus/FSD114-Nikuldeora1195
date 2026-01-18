import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";
import { useEffect, useState } from "react";
import { getTeacherCourses } from "../../api/courseApi";


const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  usePageTitle("Teacher Dashboard | EduVillage");
const [total, setTotal] = useState(0);
const [published, setPublished] = useState(0);

useEffect(() => {
  getTeacherCourses().then((res) => {
    setTotal(res.data.length);
    setPublished(
      res.data.filter((c) => c.published || c.isPublished).length
    );
  });
}, []);


  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <p>
        <strong>Logged in as:</strong> {user?.email}
      </p>

      <p>Quick actions:</p>
      <ul>
        <li>
          <Link to="/teacher/courses">My Courses</Link>
        </li>
      </ul>
      <p>Total Courses: {total}</p>
<p>Published Courses: {published}</p>


      <p>
        Use this dashboard to manage your courses and control publishing.
      </p>
    </div>
  );
};

export default TeacherDashboard;
