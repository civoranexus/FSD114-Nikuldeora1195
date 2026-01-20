import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";
import Card from "../../components/ui/Card";

const TeacherDashboard = () => {
  usePageTitle("Teacher Dashboard | EduVillage");
  const { user } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>Teacher Dashboard</h1>

      <Card title="Account">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </Card>

      <Card title="Quick Actions">
        <ul>
          <li>
            <Link to="/teacher/courses">My Courses</Link>
          </li>
          <li>
            <Link to="/teacher/announcements/create">
              Create Announcement
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
