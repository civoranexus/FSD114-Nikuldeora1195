
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";
import * as teacherCourseApi from "../../api/teacherCourseApi";

const TeacherDashboard = () => {
  usePageTitle("Teacher Dashboard | EduVillage");
  const { user, logout } = useContext(AuthContext); // Add logout from context
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    draftCourses: 0,
    totalStudents: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

 const loadDashboardData = async () => {
  try {
    const response = await teacherCourseApi.getMyCourses();
    const courses = response.data;

    const published = courses.filter((c) => c.isPublished).length;
    const draft = courses.filter((c) => !c.isPublished).length;

    let totalStudentsCount = 0;

    // 🔥 Get real student count from each course
    for (const course of courses) {
      try {
        const studentRes = await teacherCourseApi.getCourseStudents(course._id);
        totalStudentsCount += studentRes.data.length;
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log("No students for course:", course.title);
      }
    }

    setStats({
      totalCourses: courses.length,
      publishedCourses: published,
      draftCourses: draft,
      totalStudents: totalStudentsCount,
    });

    setRecentCourses(courses.slice(0, 5));

  } catch (error) {
    console.error("Failed to load dashboard data:", error);
  } finally {
    setLoading(false);
  }
};


  const monthlyData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 62 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 55 },
    { month: "May", value: 70 },
    { month: "Jun", value: 85 },
    { month: "Jul", value: 58 },
    { month: "Aug", value: 65 },
    { month: "Sep", value: 48 },
    { month: "Oct", value: 72 },
    { month: "Nov", value: 60 },
    { month: "Dec", value: 68 },
  ];

  const maxValue = Math.max(...monthlyData.map((d) => d.value));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
      </div>
    );
  }
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen p-6 sticky top-0 shadow-lg border-r border-[#CCE7EC]">
          {/* Logo and Text Stack */}
<div className="flex flex-col ml-4">
  {/* Logo Container */}
  <div className="w-28 h-16 flex ">
    <img 
      src="https://civoranexus.com/assets/Long_logo.png" 
      alt="EduVillage Logo" 
      className="w-full h-full object-contain" 
    />
  </div>

  {/* Text Underneath */}
  <span className="mb-3 text-l ml-9 font-semibold tracking-tight font-sans text-[#0a86a9]">
    EduVillage
  </span>
</div>

         {/* Navigation */}
<nav className="space-y-2">
  <Link
    to="/teacher/dashboard"
    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
  >
    <span className="text-xl">📊</span>
    <span className="font-medium">Dashboard</span>
  </Link>

  <Link
    to="/teacher/courses"
    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-[#CCE7EC] transition-colors"
  >
    <span className="text-xl">📚</span>
    <span className="font-medium">Courses</span>
  </Link>

  <Link
    to="/teacher/students"
    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-[#CCE7EC] transition-colors"
  >
    <span className="text-xl">👥</span>
    <span className="font-medium">Students</span>
  </Link>

  <Link
    to="/teacher/announcements/create"
    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-[#CCE7EC] transition-colors"
  >
    <span className="text-xl">📢</span>
    <span className="font-medium">Announcements</span>
  </Link>

  {/* <Link
    to="/teacher/results"
    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-[#CCE7EC] transition-colors"
  >
    <span className="text-xl">📈</span>
    <span className="font-medium">quiz</span>
  </Link> */}

  <button
    onClick={handleLogout}
    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-red-50 hover:text-[#EF4444] transition-colors"
  >
    <span className="text-xl">🚪</span>
    <span className="font-medium">Logout</span>
  </button>
</nav>
          {/* Promotion Card */}
          <div className="mt-8 bg-linear-to-br from-[#22C55E] to-[#178740] rounded-xl p-4 shadow-lg">
            <p className="text-sm font-semibold mb-2 text-white">Upgrade to Pro</p>
            <p className="text-xs opacity-90 mb-3 text-white">Get premium features</p>
            <div className="bg-white/20 rounded-lg p-3 mb-3 backdrop-blur-sm">
              <p className="text-lg font-bold text-white">20% off</p>
            </div>
            <button className="w-full bg-white text-[#178740] py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow-md">
              Learn More
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#142C52]">Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="bg-white border border-[#CCE7EC] rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#1B9AAA] w-64 text-[#071426] shadow-sm"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>

              {/* Notification */}
              <button 
              onClick={() => navigate('/teacher/announcements/create')}  className="relative bg-white border border-[#CCE7EC] p-2 rounded-lg hover:bg-[#F4F7FA] transition-colors shadow-sm">
                <span className="text-xl">🔔</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-2 bg-white border border-[#CCE7EC] px-3 py-2 rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "T"}
                  </span>
                </div>
                <span className="text-sm font-medium text-[#142C52]">{user?.name || "Teacher"}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Courses */}
            <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#1B9AAA] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full">
                  <span className="text-3xl">📚</span>
                </div>
                <span className="text-xs text-[#071426] opacity-60">Total</span>
              </div>
              <h3 className="text-[#071426] opacity-70 text-sm mb-1">Total Courses</h3>
              <p className="text-3xl font-bold text-[#142C52]">{stats.totalCourses}</p>
            </div>

            {/* Published Courses */}
            <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#22C55E] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-linear-to-br from-[#22C55E]/20 to-[#178740]/20 p-3 rounded-full">
                  <span className="text-3xl">✅</span>
                </div>
                <span className="text-xs text-[#071426] opacity-60">Active</span>
              </div>
              <h3 className="text-[#071426] opacity-70 text-sm mb-1">Published</h3>
              <p className="text-3xl font-bold text-[#142C52]">{stats.publishedCourses}</p>
            </div>

            {/* Draft Courses */}
            <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#EF4444] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-linear-to-br from-[#EF4444]/20 to-[#EB1414]/20 p-3 rounded-full">
                  <span className="text-3xl">📝</span>
                </div>
                <span className="text-xs text-[#071426] opacity-60">Pending</span>
              </div>
              <h3 className="text-[#071426] opacity-70 text-sm mb-1">Draft Courses</h3>
              <p className="text-3xl font-bold text-[#142C52]">{stats.draftCourses}</p>
            </div>

            {/* Total Students */}
            <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#4C97A8] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-linear-to-br from-[#4C97A8]/20 to-[#1B9AAA]/20 p-3 rounded-full">
                  <span className="text-3xl">👥</span>
                </div>
                <span className="text-xs text-[#071426] opacity-60">Enrolled</span>
              </div>
              <h3 className="text-[#071426] opacity-70 text-sm mb-1">Total Students</h3>
              <p className="text-3xl font-bold text-[#142C52]">{stats.totalStudents}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Performance Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[#CCE7EC] shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#142C52]">Monthly Performance</h2>
                <select className="bg-white border border-[#CCE7EC] rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-[#1B9AAA] text-[#071426]">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-2">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      {/* Tooltip */}
                      {index === 5 && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-[#22C55E] to-[#178740] px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap text-white shadow-lg">
                          {data.value}%
                        </div>
                      )}
                      
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          index === 5
                            ? "bg-linear-to-t from-[#22C55E] to-[#178740]"
                            : "bg-linear-to-t from-[#CCE7EC] to-[#4C97A8]"
                        } group-hover:from-[#1B9AAA] group-hover:to-[#16808D] relative overflow-hidden shadow-sm`}
                        style={{
                          height: `${(data.value / maxValue) * 100}%`,
                          minHeight: "20px",
                        }}
                      >
                        {/* Striped pattern for non-highlighted bars */}
                        {index !== 5 && (
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)"
                          }}></div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-[#071426] opacity-60 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="flex justify-between text-xs text-[#071426] opacity-60 mt-4 px-2">
                <span>0</span>
                <span>$20K</span>
                <span>$40K</span>
                <span>$60K</span>
                <span>$80K</span>
              </div>
            </div>

            {/* Activity Map */}
            <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] shadow-lg">
              <h2 className="text-xl font-bold text-[#142C52] mb-6">Student Activity</h2>
              
              {/* World Map Placeholder */}
              <div className="bg-[#F4F7FA] rounded-lg p-4 mb-4 h-40 flex items-center justify-center border border-[#CCE7EC]">
                <span className="text-6xl opacity-50">🗺️</span>
              </div>

              {/* Activity List */}
              <div className="space-y-3">
                {[
                  { city: "New York", percentage: 25, color: "from-[#EF4444] to-[#EB1414]" },
                  { city: "San Francisco", percentage: 45, color: "from-[#1B9AAA] to-[#16808D]" },
                  { city: "India", percentage: 60, color: "from-[#22C55E] to-[#178740]" },
                  { city: "Singapore", percentage: 80, color: "from-[#CCE7EC] to-[#4C97A8]" },
                ].map((activity, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#071426]">{activity.city}</span>
                      <span className="font-bold text-[#142C52]">{activity.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#F4F7FA] rounded-full h-2 overflow-hidden border border-[#CCE7EC]">
                      <div
                        className={`h-2 bg-linear-to-r ${activity.color} rounded-full transition-all duration-500 relative overflow-hidden shadow-sm`}
                        style={{ width: `${activity.percentage}%` }}
                      >
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)"
                        }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Updates Table */}
          <div className="mt-8 bg-white rounded-xl p-6 border border-[#CCE7EC] shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#142C52]">Recent Courses</h2>
              <button className="text-sm text-[#1B9AAA] hover:text-[#16808D] flex items-center gap-1 font-medium">
                <span>Sort by</span>
                <span>▼</span>
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 text-sm text-[#071426] opacity-70 mb-4 pb-2 border-b border-[#CCE7EC] font-medium">
              <div>Course Name</div>
              <div>Category</div>
              <div>Level</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {recentCourses.length === 0 ? (
                <div className="text-center py-8 text-[#071426] opacity-60">
                  <p>No courses yet. Create your first course!</p>
                </div>
              ) : (
                recentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="grid grid-cols-5 gap-4 items-center py-3 hover:bg-[#F4F7FA] rounded-lg px-2 transition-colors border border-transparent hover:border-[#CCE7EC]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <span>📚</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#142C52]">{course.title}</p>
                        <p className="text-xs text-[#071426] opacity-60">
                          {Math.floor(Math.random() * 20) + 5} lessons
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-[#071426]">Education</div>
                    <div className="text-sm text-[#071426]">
                      {course.isPublished ? "Advanced" : "Beginner"}
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          course.isPublished
                            ? "bg-linear-to-r from-[#22C55E] to-[#178740] text-white"
                            : "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]"
                        }`}
                      >
                        ⭐ {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div>
                      <Link
                        to={`/courses/${course._id}/content`}
                        className="text-sm text-[#1B9AAA] hover:text-[#16808D] font-medium"
                      >
                        Manage →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;