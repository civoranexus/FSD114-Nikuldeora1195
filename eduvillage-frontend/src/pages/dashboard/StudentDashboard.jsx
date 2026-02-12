


import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";

import StudentLayout from "../../components/app/StudentLayout";
import StatCard from "../../components/ui/StatCard";
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
  const completedCount = enrollments.filter((e) => e.isCompleted).length;
  const inProgressCount = enrolledCount - completedCount;

  const avgProgress =
    enrolledCount > 0
      ? Math.round(
          enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) /
            enrolledCount
        )
      : 0;

  // Get recent 3 courses
  const recentCourses = enrollments.slice(0, 3);

  if (loading) {
    return (
      <StudentLayout title="Student Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="  ">
      <div className="space-y-8">
        {/* ===== WELCOME BANNER ===== */}
        <div className="bg-linear-to-r from-[#02394A] via-[#012136] to-[#01181F] rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold text-cyan-600 mb-2">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="text-[#CCE7EC] text-lg">Ready to continue your learning journey?</p>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Enrolled Courses"
            value={enrolledCount}
            icon="📚"
            bgColor="bg-gradient-to-br from-[#CCE7EC] to-[#4C97A8]"
            textColor="text-[#012136]"
          />
          <StatCard
            title="In Progress"
            value={inProgressCount}
            icon="⏳"
            bgColor="bg-gradient-to-br from-[#4C97A8] to-[#02394A]"
            textColor="text-white"
          />
          <StatCard
            title="Completed"
            value={completedCount}
            icon="✅"
            bgColor="bg-gradient-to-br from-[#22C55E] to-[#178740]"
            textColor="text-white"
          />
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/courses"
            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#1B9AAA]"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#142C52] group-hover:text-[#1B9AAA] transition-colors">
                  Browse Courses
                </h3>
                <p className="text-[#071426] text-sm opacity-70">Discover new courses</p>
              </div>
            </div>
          </Link>

          <Link
            to="/my-courses"
            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#02394A]"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-[#4C97A8] to-[#02394A] p-3 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-2xl">📖</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#142C52] group-hover:text-[#1B9AAA] transition-colors">
                  My Courses
                </h3>
                <p className="text-[#071426] text-sm opacity-70">View your enrollments</p>
              </div>
            </div>
          </Link>

          <Link
            to="/announcements"
            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#012136]"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-linear-to-br from-[#02394A] to-[#01181F] p-3 rounded-full group-hover:scale-110 transition-transform">
                <span className="text-2xl">📢</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#142C52] group-hover:text-[#1B9AAA] transition-colors">
                  Announcements
                </h3>
                <p className="text-[#071426] text-sm opacity-70">Check latest updates</p>
              </div>
            </div>
          </Link>
        </div>

        {/* ===== CONTINUE LEARNING SECTION ===== */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#142C52]">Continue Learning</h2>
            <Link
              to="/my-courses"
              className="text-[#1B9AAA] hover:text-[#16808D] font-medium flex items-center gap-1 transition-colors"
            >
              View All <span>→</span>
            </Link>
          </div>

          {recentCourses.length === 0 ? (
            <div className="text-center py-12 bg-[#F4F7FA] rounded-lg">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-[#071426] text-lg mb-2">No courses enrolled yet</p>
              <p className="text-[#071426] opacity-70 mb-4">Start your learning journey today!</p>
              <Link
                to="/courses"
                className="inline-block bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCourses.map((enrollment) => (
                <Link
                  key={enrollment._id}
                  to={`/courses/${enrollment.course._id}/content`}
                  className="block p-5 border-2 border-transparent rounded-xl hover:border-[#1B9AAA] hover:bg-[#F4F7FA] transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-[#142C52] group-hover:text-[#1B9AAA] transition-colors">
                      {enrollment.course.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        enrollment.isCompleted
                          ? 'bg-linear-to-r from-[#22C55E] to-[#178740] text-white'
                          : 'bg-linear-to-r from-[#CCE7EC] to-[#4C97A8] text-[#012136]'
                      }`}
                    >
                      {enrollment.isCompleted ? '✓ Completed' : '⏳ In Progress'}
                    </span>
                  </div>
                  <p className="text-[#071426] opacity-70 text-sm mb-4 line-clamp-2">
                    {enrollment.course.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#071426] font-medium">Progress</span>
                      <span className="text-[#1B9AAA] font-semibold">{enrollment.progress}%</span>
                    </div>
                    <div className="w-full bg-[#CCE7EC] rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ===== ACCOUNT INFO CARD ===== */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-[#142C52] mb-4">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-[#F4F7FA] rounded-lg">
              <div className="bg-linear-to-br from-[#1B9AAA] to-[#16808D] p-2 rounded-full">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <p className="text-sm text-[#071426] opacity-70">Name</p>
                <p className="font-semibold text-[#142C52]">{user?.name || 'Student'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#F4F7FA] rounded-lg">
              <div className="bg-linear-to-br from-[#02394A] to-[#012136] p-2 rounded-full">
                <span className="text-xl">✉️</span>
              </div>
              <div>
                <p className="text-sm text-[#071426] opacity-70">Email</p>
                <p className="font-semibold text-[#142C52]">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-[#F4F7FA] rounded-lg">
              <div className="bg-linear-to-br from-[#22C55E] to-[#178740] p-2 rounded-full">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <p className="text-sm text-[#071426] opacity-70">Average Progress</p>
                <p className="font-semibold text-[#142C52]">{avgProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;