

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getMyEnrollments, updateProgress } from "../../api/enrollmentApi";
import {
  getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";
import usePageTitle from "../../utils/usePageTitle";
import StudentLayout from "../../components/app/StudentLayout";
// import { generateCertificate } from "../../api/certificateApi";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const MyCourses = () => {
  usePageTitle("My Learning | EduVillage");

  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, in-progress, completed
const { user } = useContext(AuthContext);

  // 🔄 Load enrolled courses
  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await getMyEnrollments();
      setCourses(res.data);
    } catch {
      setError("Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // 📊 Update progress
  const handleProgressChange = async (id, value) => {
    const progress = Number(value);
    if (progress < 0 || progress > 100 || isNaN(progress)) return;

    try {
      await updateProgress(id, progress);
      loadCourses();
    } catch {
      console.error("Progress update failed");
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((item) => {
    if (filter === "completed") return item.isCompleted;
    if (filter === "in-progress") return !item.isCompleted;
    return true;
  });

  // Calculate stats
  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.isCompleted).length;
  const inProgressCourses = totalCourses - completedCourses;
  const avgProgress = totalCourses > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalCourses)
    : 0;

  if (loading) {
    return (
      <StudentLayout title="My Learning">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="  ">
      <div className="space-y-8">
        {/* Header Section with Gradient */}
        <div className="bg-linear-to-r from-[#02394A] via-[#012136] to-[#01181F] rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold text-cyan-600 mb-2">My Learning Journey 📖</h1>
          <p className="text-[#CCE7EC] text-lg">
            Track your progress and continue where you left off
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Courses */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#1B9AAA] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#071426] opacity-70 text-sm font-medium mb-1">
                  Total Enrolled
                </p>
                <p className="text-4xl font-bold text-[#142C52]">{totalCourses}</p>
              </div>
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-4 rounded-full">
                <span className="text-4xl">📚</span>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#4C97A8] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#071426] opacity-70 text-sm font-medium mb-1">
                  In Progress
                </p>
                <p className="text-4xl font-bold text-[#142C52]">{inProgressCourses}</p>
              </div>
              <div className="bg-linear-to-br from-[#4C97A8] to-[#02394A] p-4 rounded-full">
                <span className="text-4xl">⏳</span>
              </div>
            </div>
          </div>

          

          {/* Completed */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#22C55E] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#071426] opacity-70 text-sm font-medium mb-1">
                  Completed
                </p>
                <p className="text-4xl font-bold text-[#142C52]">{completedCourses}</p>
              </div>
              
              <div className="bg-linear-to-br from-[#22C55E] to-[#178740] p-4 rounded-full">
                <span className="text-4xl">✅</span>
              </div>
            </div>
          </div>
        </div>
        

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-[#EF4444] p-4 rounded-lg shadow-md">
            <p className="text-[#EF4444] font-medium">{error}</p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-2 inline-flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            All Courses ({totalCourses})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "in-progress"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            In Progress ({inProgressCourses})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "completed"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            Completed ({completedCourses})
          </button>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="text-6xl mb-4">
              {filter === "completed" ? "🎓" : filter === "in-progress" ? "📖" : "📚"}
            </div>
            <h3 className="text-2xl font-bold text-[#142C52] mb-2">
              {filter === "completed"
                ? "No Completed Courses Yet"
                : filter === "in-progress"
                ? "No Courses In Progress"
                : "No Enrolled Courses"}
            </h3>
            <p className="text-[#071426] opacity-70 mb-6">
              {filter === "all"
                ? "Start your learning journey by enrolling in a course!"
                : `You don't have any ${filter === "completed" ? "completed" : "in-progress"} courses.`}
            </p>
            {filter === "all" && (
              <button
                onClick={() => navigate("/courses")}
                className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Browse Courses
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((item) => {
              const course = item.course;
              const progress = item.progress || 0;

              return (
                <div
                  key={item._id}
                  className="group bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#1B9AAA] transform hover:-translate-y-2"
                >
                  {/* Course Header with Gradient */}
                  <div className="h-32 bg-linear-to-br from-[#CCE7EC] via-[#4C97A8] to-[#02394A] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-80">
                        {item.isCompleted ? "🎓" : "📖"}
                      </span>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                          item.isCompleted
                            ? "bg-linear-to-r from-[#22C55E] to-[#178740] text-white"
                            : "bg-white text-[#4C97A8]"
                        }`}
                      >
                        {item.isCompleted ? "✓ Completed" : "⏳ In Progress"}
                      </span>
                    </div>
                    {/* Progress Percentage Overlay */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-[#142C52] font-bold text-sm">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 space-y-4">
                    {/* Course Title */}
                    <h2 className="text-xl font-bold text-[#142C52] line-clamp-2 group-hover:text-[#1B9AAA] transition-colors min-h-14">
                      {course?.title}
                    </h2>

                    {/* Course Description */}
                    <p className="text-sm text-[#071426] opacity-70 line-clamp-3 min-h-18">
                      {course?.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#071426] font-medium">Progress</span>
                        <span className="text-[#1B9AAA] font-bold">{progress}%</span>
                      </div>
                      <div className="w-full bg-[#CCE7EC] rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Manual Progress Update */}
                    <div className="flex items-center space-x-2 pt-2">
                      <label className="text-sm text-[#071426] opacity-70 font-medium">
                        Update:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => handleProgressChange(item._id, e.target.value)}
                        className="flex-1 border-2 border-[#CCE7EC] focus:border-[#1B9AAA] rounded-lg px-3 py-2 text-sm outline-none transition-colors"
                        placeholder="0-100"
                      />
                      <span className="text-sm text-[#071426] opacity-70">%</span>
                    </div>

                  {/* Certificate Section */}
{item.isCompleted && (
  <div className="bg-linear-to-r from-[#22C55E]/10 to-[#178740]/10 border-l-4 border-[#22C55E] p-4 rounded-lg space-y-2">
    <p className="text-[#178740] text-sm font-semibold flex items-center gap-2">
      🎓 Certificate Eligible
    </p>
<button
  onClick={() =>
navigate(`/certificate/${encodeURIComponent(course.title)}`

)

  }
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  View Certificate
</button>



  </div>
)}


                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => navigate(`/courses/${course?._id}/content`)}
                        className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                      >
                        {item.isCompleted ? "Review Course" : "Continue Learning"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}





        {/* Overall Progress Summary */}
        {totalCourses > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-[#142C52] mb-4">
              Overall Progress Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#071426] font-medium">Average Completion</span>
                <span className="text-2xl font-bold text-[#1B9AAA]">{avgProgress}%</span>
              </div>
              <div className="w-full bg-[#CCE7EC] rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-4 rounded-full transition-all duration-500"
                  style={{ width: `${avgProgress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm text-[#071426] opacity-70">Total</p>
                  <p className="text-lg font-bold text-[#142C52]">{totalCourses}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#071426] opacity-70">Active</p>
                  <p className="text-lg font-bold text-[#4C97A8]">{inProgressCourses}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#071426] opacity-70">Done</p>
                  <p className="text-lg font-bold text-[#22C55E]">{completedCourses}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MyCourses;









