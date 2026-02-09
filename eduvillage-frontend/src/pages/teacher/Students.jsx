import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import * as teacherCourseApi from "../../api/teacherCourseApi";
import toast from "react-hot-toast";

const Students = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await teacherCourseApi.getMyCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Mock student data (since we don't have enrollment API for teachers)
  // In real implementation, you'd fetch this from an API endpoint
  const mockStudents = useMemo(() => {
    const students = [];
    courses.forEach((course) => {
      const studentCount = Math.floor(Math.random() * 50) + 10;
      for (let i = 0; i < studentCount; i++) {
        students.push({
          _id: `${course._id}-student-${i}`,
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          courseId: course._id,
          courseName: course.title,
          enrolledDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          progress: Math.floor(Math.random() * 100),
          isActive: Math.random() > 0.1,
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        });
      }
    });
    return students;
  }, [courses]);

  // Filter students
  const filteredStudents = mockStudents.filter((student) => {
    const matchesCourse = selectedCourse === "all" || student.courseId === selectedCourse;
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  // Calculate stats
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter((s) => s.isActive).length;
  const averageProgress = mockStudents.length > 0
    ? Math.round(mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length)
    : 0;
  const completedStudents = mockStudents.filter((s) => s.progress === 100).length;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Get time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#142C52] mb-2">My Students</h1>
            <p className="text-[#071426] opacity-70 text-lg">
              Monitor student progress and engagement
            </p>
          </div>
          <Link
            to="/teacher/dashboard"
            className="text-[#1B9AAA] hover:text-[#16808D] font-medium flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#1B9AAA] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full">
                <span className="text-3xl">👥</span>
              </div>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Total Students</h3>
            <p className="text-3xl font-bold text-[#142C52]">{totalStudents}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#22C55E] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#22C55E]/20 to-[#178740]/20 p-3 rounded-full">
                <span className="text-3xl">✅</span>
              </div>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Active Students</h3>
            <p className="text-3xl font-bold text-[#142C52]">{activeStudents}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#1B9AAA] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#1B9AAA]/20 to-[#16808D]/20 p-3 rounded-full">
                <span className="text-3xl">📊</span>
              </div>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Avg Progress</h3>
            <p className="text-3xl font-bold text-[#142C52]">{averageProgress}%</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#4C97A8] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#4C97A8]/20 to-[#02394A]/20 p-3 rounded-full">
                <span className="text-3xl">🎓</span>
              </div>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Completed</h3>
            <p className="text-3xl font-bold text-[#142C52]">{completedStudents}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Course Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-sm font-semibold text-[#142C52]">Filter by Course:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-[#CCE7EC] focus:border-[#1B9AAA] focus:outline-none font-medium text-[#142C52] cursor-pointer hover:bg-[#F4F7FA] transition-colors"
              >
                <option value="all">All Courses ({totalStudents})</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title} ({mockStudents.filter(s => s.courseId === course._id).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#1B9AAA] transition-colors"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 border-b border-[#CCE7EC]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Student
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Course
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Progress
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Enrolled Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Last Active
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-[#142C52]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="text-[#071426] opacity-60">
                        <p className="text-lg mb-2">No students found</p>
                        <p className="text-sm">Try adjusting your filters or search query</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="border-b border-[#CCE7EC] hover:bg-[#F4F7FA] transition-colors"
                    >
                      {/* Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-[#142C52]">{student.name}</p>
                            <p className="text-xs text-[#071426] opacity-60">{student.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#071426] font-medium">{student.courseName}</p>
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#071426] opacity-70">Progress</span>
                            <span className="text-[#1B9AAA] font-bold">{student.progress}%</span>
                          </div>
                          <div className="w-32 bg-[#F4F7FA] rounded-full h-2 overflow-hidden border border-[#CCE7EC]">
                            <div
                              className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Enrolled Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#071426]">{formatDate(student.enrolledDate)}</p>
                      </td>

                      {/* Last Active */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#071426] opacity-70">{getTimeAgo(student.lastActive)}</p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            student.isActive
                              ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]"
                              : "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]"
                          }`}
                        >
                          <span>{student.isActive ? "●" : "○"}</span>
                          <span>{student.isActive ? "Active" : "Inactive"}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="bg-[#F4F7FA] px-6 py-4 border-t border-[#CCE7EC]">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#071426] opacity-70">
                  Showing {filteredStudents.length} of {totalStudents} students
                </p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg border border-[#CCE7EC] text-sm font-medium text-[#071426] hover:bg-white transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white text-sm font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-[#CCE7EC] text-sm font-medium text-[#071426] hover:bg-white transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Performance Overview */}
        {courses.length > 0 && (
          <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#142C52] mb-6">Course Performance</h2>
            <div className="space-y-4">
              {courses.map((course) => {
                const courseStudents = mockStudents.filter((s) => s.courseId === course._id);
                const avgCourseProgress = courseStudents.length > 0
                  ? Math.round(courseStudents.reduce((sum, s) => sum + s.progress, 0) / courseStudents.length)
                  : 0;

                return (
                  <div key={course._id} className="p-4 bg-[#F4F7FA] rounded-lg border border-[#CCE7EC]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-[#142C52]">{course.title}</h3>
                        <p className="text-sm text-[#071426] opacity-70">
                          {courseStudents.length} students enrolled
                        </p>
                      </div>
                      <span className="text-lg font-bold text-[#1B9AAA]">{avgCourseProgress}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-[#CCE7EC]">
                      <div
                        className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${avgCourseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;