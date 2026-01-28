import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";

import StudentLayout from "../../components/app/StudentLayout";

import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import { getMyEnrollments } from "../../api/enrollmentApi";

const StudentDashboard = () => {
  usePageTitle("Student Dashboard | EduVillage");
  const { user } = useContext(AuthContext);

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyEnrollments()
      .then((res) => {
        setEnrollments(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to load enrollments");
        setLoading(false);
      });
  }, []);

  const enrolledCount = enrollments.length;
  const completedCount = enrollments.filter(
    (e) => e.isCompleted
  ).length;

  const avgProgress =
    enrolledCount > 0
      ? Math.round(
          enrollments.reduce(
            (sum, e) => sum + (e.progress || 0),
            0
          ) / enrolledCount
        )
      : 0;

  return (
    <StudentLayout title="Student Dashboard">

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Enrolled Courses"
          value={loading ? "..." : enrolledCount}
        />
        <StatCard
          label="Completed Courses"
          value={loading ? "..." : completedCount}
        />
        <StatCard
          label="Average Progress"
          value={loading ? "..." : `${avgProgress}%`}
        />
      </div>

      {/* ===== ACCOUNT INFO ===== */}
      <div className="max-w-3xl space-y-6">
        <Card title="Account">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </Card>

        {/* ===== QUICK ACTIONS ===== */}
        <Card title="Quick Actions">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link
                to="/courses"
                className="text-[#142C52] font-medium"
              >
                Browse Courses
              </Link>
            </li>
            <li>
              <Link
                to="/my-courses"
                className="text-[#142C52] font-medium"
              >
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to="/announcements"
                className="text-[#142C52] font-medium"
              >
                Announcements
              </Link>
            </li>
          </ul>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
