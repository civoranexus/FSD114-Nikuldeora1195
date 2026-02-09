// import { useEffect, useState } from "react";
// import { getPublishedCourses, enrollCourse } from "../../api/courseApi";
// import StudentLayout from "../../components/app/StudentLayout";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getPublishedCourses()
//       .then((res) => setCourses(res.data))
//       .catch(() => setError("Failed to load courses"));
//   }, []);

//   const handleEnroll = async (id) => {
//     try {
//       await enrollCourse(id);
//       alert("Enrolled successfully");
//     } catch {
//       alert("Already enrolled or error occurred");
//     }
//   };

//   return (
//     <StudentLayout title="Courses">
//     <div>
//       <h2>Available Courses</h2>
//       {error && <p>{error}</p>}

//       {courses.map((course) => (
//         <div key={course._id}>
//           <h4>{course.title}</h4>
//           <p>{course.description}</p>
//           <button onClick={() => handleEnroll(course._id)}>
//             Enroll
//           </button>
//         </div>
//       ))}
//     </div>
//     </StudentLayout>
//   );
// };

// export default CourseList;



import { useEffect, useState } from "react";
import { getPublishedCourses, enrollCourse } from "../../api/courseApi";
import StudentLayout from "../../components/app/StudentLayout";
import usePageTitle from "../../utils/usePageTitle";

const CourseList = () => {
  usePageTitle("Browse Courses | EduVillage");
  
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  useEffect(() => {
    getPublishedCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load courses");
        setLoading(false);
      });
  }, []);

  const handleEnroll = async (id) => {
    setEnrollingId(id);
    try {
      await enrollCourse(id);
      alert("🎉 Enrolled successfully! Check 'My Courses' to start learning.");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("ℹ️ You are already enrolled in this course.");
      } else {
        alert("❌ Enrollment failed. Please try again.");
      }
    } finally {
      setEnrollingId(null);
    }
  };

  if (loading) {
    return (
      <StudentLayout title="Browse Courses">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="Browse Courses">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-linear-to-r from-[#02394A] via-[#012136] to-[#01181F] rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold text-cyan-600 mb-2">Explore Courses 🎓</h1>
          <p className="text-[#CCE7EC] text-lg">
            Discover new skills and advance your learning journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-[#EF4444] p-4 rounded-lg">
            <p className="text-[#EF4444] font-medium">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-[#142C52] mb-2">
              No Courses Available Yet
            </h3>
            <p className="text-[#071426] opacity-70">
              Check back soon for new courses!
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#142C52]">
                Featured Courses
              </h2>
              <p className="text-[#071426] opacity-70">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-transparent hover:border-[#1B9AAA]"
                >
                  {/* Course Image Placeholder */}
                  <div className="h-48 bg-linear-to-br from-[#CCE7EC] via-[#4C97A8] to-[#02394A] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-80">📚</span>
                    </div>
                    {/* Free Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-linear-to-r from-[#22C55E] to-[#178740] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Free
                      </span>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#01181F] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5 space-y-4">
                    {/* Category Badge */}
                    <div>
                      <span className="inline-block bg-[#F4F7FA] text-[#1B9AAA] px-3 py-1 rounded-md text-xs font-semibold">
                        Education
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-bold text-lg text-[#142C52] line-clamp-2 group-hover:text-[#1B9AAA] transition-colors min-h-14">
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    <p className="text-[#071426] opacity-70 text-sm line-clamp-3 min-h-18">
                      {course.description}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                      <div className="w-8 h-8 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {course.createdBy?.name?.charAt(0).toUpperCase() || 'T'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#071426] text-sm font-medium truncate">
                          {course.createdBy?.name || 'Instructor'}
                        </p>
                      </div>
                    </div>

                    {/* Rating Placeholder */}
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(5)}
                      </div>
                      <span className="text-[#071426] opacity-70 text-sm">
                        5.0 (New)
                      </span>
                    </div>

                    {/* Enroll Button */}
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollingId === course._id}
                      className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                        enrollingId === course._id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-linear-to-r from-[#1B9AAA] to-[#16808D] hover:from-[#16808D] hover:to-[#1B9AAA]'
                      }`}
                    >
                      {enrollingId === course._id ? (
                        <span className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Enrolling...</span>
                        </span>
                      ) : (
                        'Enroll Now'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action Banner */}
        {courses.length > 0 && (
          <div className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] rounded-xl p-8 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-3">Start Learning Today</h2>
            <p className="text-[#CCE7EC] text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of students who are already learning and growing with EduVillage. Get started with a free account.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-[#1B9AAA] px-8 py-3 rounded-lg font-semibold hover:bg-[#F4F7FA] transition-colors shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1B9AAA] transition-all">
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default CourseList;