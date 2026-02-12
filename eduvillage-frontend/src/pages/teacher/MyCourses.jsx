/* eslint-disable react-hooks/purity */
// /* eslint-disable react-hooks/purity */
// // import { useEffect, useState } from "react";
// // import TeacherLayout from "../../components/app/TeacherLayout";
// // import { Link } from "react-router-dom";
// // import {
// //   getMyCourses,
// //   publishCourse,
// // } from "../../api/teacherCourseApi";

// // import toast from "react-hot-toast";

// // const MyCourses = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const loadCourses = () => {
// //     getMyCourses()
// //       .then((res) => {
// //         setCourses(res.data);
// //         setLoading(false);
// //       })
// //       .catch(() => {
// //         console.error("Failed to load courses");
// //         setLoading(false);
// //       });
// //   };

// //   useEffect(() => {
// //     loadCourses();
// //   }, []);

// // const handlePublish = async (id) => {
// //   const t = toast.loading("Publishing...");
// //   try {
// //     await publishCourse(id);
// //     toast.success("Course published", { id: t });
// //     loadCourses();
// //   } catch {
// //     toast.error("Publish failed", { id: t });
// //   }
// // };






// //   return (
// //     <TeacherLayout title="Teacher Dashboard">
// //       <div className="max-w-4xl mx-auto">

// //         {/* Teacher action bar */}
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl font-semibold text-[#142C52]">
// //             My Courses
// //           </h2>

// //           <Link
// //             to="/teacher/courses/create"
// //             className="bg-[#142C52] text-white px-4 py-2 rounded text-sm"
// //           >
// //             + Create Course
// //           </Link>
// //         </div>

// //         {loading && (
// //           <p className="text-sm text-gray-600">
// //             Loading courses...
// //           </p>
// //         )}

// //         {!loading && courses.length === 0 && (
// //           <div className="bg-white rounded-lg p-6 shadow">
// //             <p>You have not created any courses yet.</p>
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {courses.map((course) => (
// //             <div
// //               key={course._id}
// //               className="bg-white rounded-xl p-6 shadow"
// //             >
// //               <h4 className="text-lg font-medium mb-2">
// //                 {course.title}
// //               </h4>

// //               <p className="text-sm mb-3 text-gray-600">
// //                 {course.description}
// //               </p>

// //               <p className="text-sm mb-3">
// //                 Status:{" "}
// //                 <span
// //                   className={`font-semibold ${
// //                     course.isPublished
// //                       ? "text-green-600"
// //                       : "text-yellow-600"
// //                   }`}
// //                 >
// //                   {course.isPublished ? "Published" : "Draft"}
// //                 </span>
// //               </p>

// //               <div className="flex items-center gap-4">
// //                 <Link
// //                   to={`/teacher/courses/${course._id}/edit`}
// //                   className="text-sm text-blue-600 underline"
// //                 >
// //                   Edit
// //                 </Link>

// //                 {!course.isPublished && (
// //                   <button
// //                     onClick={() => handlePublish(course._id)}
// //                     className="text-sm bg-green-600 text-white px-3 py-1 rounded"
// //                   >
// //                     Publish
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </TeacherLayout>
// //   );
// // };

// // export default MyCourses;










// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getMyCourses, publishCourse } from "../../api/teacherCourseApi";
// import toast from "react-hot-toast";

// const MyCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all, published, draft

//   const loadCourses = () => {
//     getMyCourses()
//       .then((res) => {
//         setCourses(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Failed to load courses");
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const handlePublish = async (id) => {
//     const t = toast.loading("Publishing...");
//     try {
//       await publishCourse(id);
//       toast.success("Course published successfully! 🎉", { id: t });
//       loadCourses();
//     } catch {
//       toast.error("Failed to publish course", { id: t });
//     }
//   };

//   // Filter courses
//   const filteredCourses = courses.filter((course) => {
//     if (filter === "published") return course.isPublished;
//     if (filter === "draft") return !course.isPublished;
//     return true;
//   });

//   // Calculate stats
//   const totalCourses = courses.length;
//   const publishedCourses = courses.filter((c) => c.isPublished).length;
//   const draftCourses = totalCourses - publishedCourses;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#01181F] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#01181F] text-white p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
//             <p className="text-[#CCE7EC] text-lg">
//               Manage and organize your course content
//             </p>
//           </div>
//           <Link
//             to="/teacher/courses/create"
//             className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
//           >
//             <span className="text-xl">➕</span>
//             <span>Create Course</span>
//           </Link>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-[#02394A] rounded-xl p-6 border border-[#4C97A8]/20 hover:border-[#1B9AAA] transition-all duration-300 transform hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-linear-to-br from-[#1B9AAA]/20 to-[#16808D]/20 p-3 rounded-full">
//                 <span className="text-3xl">📚</span>
//               </div>
//               <span className="text-xs text-[#CCE7EC]">Total</span>
//             </div>
//             <h3 className="text-[#CCE7EC] text-sm mb-1">Total Courses</h3>
//             <p className="text-4xl font-bold text-white">{totalCourses}</p>
//           </div>

//           <div className="bg-[#02394A] rounded-xl p-6 border border-[#4C97A8]/20 hover:border-[#22C55E] transition-all duration-300 transform hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-linear-to-br from-[#22C55E]/20 to-[#178740]/20 p-3 rounded-full">
//                 <span className="text-3xl">✅</span>
//               </div>
//               <span className="text-xs text-[#CCE7EC]">Live</span>
//             </div>
//             <h3 className="text-[#CCE7EC] text-sm mb-1">Published</h3>
//             <p className="text-4xl font-bold text-white">{publishedCourses}</p>
//           </div>

//           <div className="bg-[#02394A] rounded-xl p-6 border border-[#4C97A8]/20 hover:border-[#EF4444] transition-all duration-300 transform hover:-translate-y-1">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-linear-to-br from-[#EF4444]/20 to-[#EB1414]/20 p-3 rounded-full">
//                 <span className="text-3xl">📝</span>
//               </div>
//               <span className="text-xs text-[#CCE7EC]">Pending</span>
//             </div>
//             <h3 className="text-[#CCE7EC] text-sm mb-1">Draft</h3>
//             <p className="text-4xl font-bold text-white">{draftCourses}</p>
//           </div>
//         </div>

//         {/* Filter Tabs */}
//         <div className="bg-[#02394A] border border-[#4C97A8]/20 rounded-xl p-2 inline-flex space-x-2">
//           <button
//             onClick={() => setFilter("all")}
//             className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
//               filter === "all"
//                 ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                 : "text-[#CCE7EC] hover:bg-[#01181F]"
//             }`}
//           >
//             All Courses ({totalCourses})
//           </button>
//           <button
//             onClick={() => setFilter("published")}
//             className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
//               filter === "published"
//                 ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                 : "text-[#CCE7EC] hover:bg-[#01181F]"
//             }`}
//           >
//             Published ({publishedCourses})
//           </button>
//           <button
//             onClick={() => setFilter("draft")}
//             className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
//               filter === "draft"
//                 ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                 : "text-[#CCE7EC] hover:bg-[#01181F]"
//             }`}
//           >
//             Draft ({draftCourses})
//           </button>
//         </div>

//         {/* Courses Grid */}
//         {filteredCourses.length === 0 ? (
//           <div className="text-center py-20 bg-[#02394A] rounded-xl border border-[#4C97A8]/20">
//             <div className="text-6xl mb-4">
//               {filter === "published" ? "✅" : filter === "draft" ? "📝" : "📚"}
//             </div>
//             <h3 className="text-2xl font-bold text-white mb-2">
//               {filter === "published"
//                 ? "No Published Courses"
//                 : filter === "draft"
//                 ? "No Draft Courses"
//                 : "No Courses Created"}
//             </h3>
//             <p className="text-[#CCE7EC] mb-6">
//               {filter === "all"
//                 ? "Start creating your first course to share your knowledge!"
//                 : `You don't have any ${filter} courses yet.`}
//             </p>
//             {filter === "all" && (
//               <Link
//                 to="/teacher/courses/create"
//                 className="inline-block bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
//               >
//                 Create Your First Course
//               </Link>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCourses.map((course, index) => (
//               <div
//                 key={course._id}
//                 className="group bg-[#02394A] rounded-xl border border-[#4C97A8]/20 hover:border-[#1B9AAA] transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl"
//                 style={{
//                   animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
//                 }}
//               >
//                 {/* Course Header */}
//                 <div className="h-40 bg-linear-to-br from-[#CCE7EC] via-[#4C97A8] to-[#02394A] relative overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-6xl opacity-80">
//                       {course.isPublished ? "🎓" : "📝"}
//                     </span>
//                   </div>

//                   {/* Status Badge */}
//                   <div className="absolute top-3 right-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
//                         course.isPublished
//                           ? "bg-linear-to-r from-[#22C55E] to-[#178740] text-white"
//                           : "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]"
//                       }`}
//                     >
//                       {course.isPublished ? "✓ Published" : "Draft"}
//                     </span>
//                   </div>

//                   {/* Lessons Count */}
//                   <div className="absolute bottom-3 left-3 bg-[#01181F]/80 backdrop-blur-sm px-3 py-1 rounded-full">
//                     <span className="text-white text-sm font-semibold">
//                       // eslint-disable-next-line react-hooks/purity, react-hooks/purity, react-hooks/purity, react-hooks/purity
//                       {Math.floor(Math.random() * 20) + 5} Lessons
//                     </span>
//                   </div>
//                 </div>

//                 {/* Course Content */}
//                 <div className="p-6 space-y-4">
//                   {/* Title */}
//                   <h3 className="text-xl font-bold text-white group-hover:text-[#CCE7EC] transition-colors line-clamp-2 min-h-14">
//                     {course.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-[#CCE7EC] text-sm line-clamp-3 min-h-18 opacity-80">
//                     {course.description}
//                   </p>

//                   {/* Metadata */}
//                   <div className="flex items-center gap-3 pt-2 border-t border-[#4C97A8]/20">
//                     <div className="flex items-center gap-2 text-sm text-[#CCE7EC]">
//                       <span>👥</span>
//                       <span>{Math.floor(Math.random() * 100)} Students</span>
//                     </div>
//                     <span className="text-[#4C97A8]">•</span>
//                     <div className="flex items-center gap-2 text-sm text-[#CCE7EC]">
//                       <span>⭐</span>
//                       <span>4.{Math.floor(Math.random() * 10)}</span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2 pt-2">
//                     <Link
//                       to={`/courses/${course._id}/content`}
//                       className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-center text-sm"
//                     >
//                       Manage Content
//                     </Link>
                    
//                     {!course.isPublished && (
//                       <button
//                         onClick={() => handlePublish(course._id)}
//                         className="bg-linear-to-r from-[#22C55E] to-[#178740] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
//                       >
//                         Publish
//                       </button>
//                     )}
//                   </div>

//                   {/* Edit Link */}
//                   <Link
//                     to={`/teacher/courses/${course._id}/edit`}
//                     className="block text-center text-sm text-[#1B9AAA] hover:text-[#CCE7EC] font-medium transition-colors"
//                   >
//                     Edit Course Details →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add fadeInUp animation */}
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MyCourses;










import { useEffect, useState } from "react";


import { Link, useNavigate } from "react-router-dom";

import { getMyCourses, publishCourse } from "../../api/teacherCourseApi";
import toast from "react-hot-toast";
import TeacherLayout from "../../components/app/TeacherLayout";
const MyCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadCourses = () => {
    getMyCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load courses");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handlePublish = async (id) => {
    const t = toast.loading("Publishing...");
    try {
      await publishCourse(id);
      toast.success("Course published successfully! 🎉", { id: t });
      loadCourses();
    } catch {
      toast.error("Failed to publish course", { id: t });
    }
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === "published") return course.isPublished;
    if (filter === "draft") return !course.isPublished;
    return true;
  });

  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.isPublished).length;
  const draftCourses = totalCourses - publishedCourses;

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
        {/* Back Button */}
<button
  onClick={() => navigate("/teacher/dashboard")}
  className="mb-4 bg-[#1B9AAA] text-white  px-4 py-2 rounded-lg font-medium hover:bg-[#16808D] transition"
>
  ← Back to Dashboard
</button>

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#142C52] mb-2">My Courses</h1>
            <p className="text-[#071426] opacity-70 text-lg">
              Manage and organize your course content
            </p>
          </div>
          <Link
            to="/teacher/courses/create"
            className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            <span>Create Course</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#1B9AAA] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full">
                <span className="text-3xl">📚</span>
              </div>
              <span className="text-xs text-[#071426] opacity-60">Total</span>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Total Courses</h3>
            <p className="text-4xl font-bold text-[#142C52]">{totalCourses}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#22C55E] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#22C55E]/20 to-[#178740]/20 p-3 rounded-full">
                <span className="text-3xl">✅</span>
              </div>
              <span className="text-xs text-[#071426] opacity-60">Live</span>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Published</h3>
            <p className="text-4xl font-bold text-[#142C52]">{publishedCourses}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#CCE7EC] hover:border-[#EF4444] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-[#EF4444]/20 to-[#EB1414]/20 p-3 rounded-full">
                <span className="text-3xl">📝</span>
              </div>
              <span className="text-xs text-[#071426] opacity-60">Pending</span>
            </div>
            <h3 className="text-[#071426] opacity-70 text-sm mb-1">Draft</h3>
            <p className="text-4xl font-bold text-[#142C52]">{draftCourses}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border border-[#CCE7EC] rounded-xl p-2 inline-flex space-x-2 shadow-md">
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
            onClick={() => setFilter("published")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "published"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            Published ({publishedCourses})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "draft"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            Draft ({draftCourses})
          </button>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#CCE7EC] shadow-lg">
            <div className="text-6xl mb-4">
              {filter === "published" ? "✅" : filter === "draft" ? "📝" : "📚"}
            </div>
            <h3 className="text-2xl font-bold text-[#142C52] mb-2">
              {filter === "published"
                ? "No Published Courses"
                : filter === "draft"
                ? "No Draft Courses"
                : "No Courses Created"}
            </h3>
            <p className="text-[#071426] opacity-70 mb-6">
              {filter === "all"
                ? "Start creating your first course to share your knowledge!"
                : `You don't have any ${filter} courses yet.`}
            </p>
            {filter === "all" && (
              <Link
                to="/teacher/courses/create"
                className="inline-block bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Create Your First Course
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={course._id}
                className="group bg-white rounded-xl border border-[#CCE7EC] hover:border-[#1B9AAA] hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Course Header */}
                <div className="h-40 bg-linear-to-br from-[#CCE7EC] via-[#4C97A8] to-[#02394A] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-80">
                      {course.isPublished ? "🎓" : "📝"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        course.isPublished
                          ? "bg-linear-to-r from-[#22C55E] to-[#178740] text-white"
                          : "bg-white text-[#EF4444] border-2 border-[#EF4444]"
                      }`}
                    >
                      {course.isPublished ? "✓ Published" : "Draft"}
                    </span>
                  </div>

                  {/* Lessons Count */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                    <span className="text-[#142C52] text-sm font-semibold">
                      {Math.floor(Math.random() * 20) + 5} Lessons
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#142C52] group-hover:text-[#1B9AAA] transition-colors line-clamp-2 min-h-14">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#071426] opacity-70 text-sm line-clamp-3 min-h-18">
                    {course.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#CCE7EC]">
                    <div className="flex items-center gap-2 text-sm text-[#071426]">
                      <span>👥</span>
                      <span>{Math.floor(Math.random() * 100)} Students</span>
                    </div>
                    <span className="text-[#CCE7EC]">•</span>
                    <div className="flex items-center gap-2 text-sm text-[#071426]">
                      <span>⭐</span>
                      <span>4.{Math.floor(Math.random() * 10)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link
                      to={`/courses/${course._id}/content`}
                      className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-center text-sm"
                    >
                      Manage Content
                    </Link>
                    
                    {!course.isPublished && (
                      <button
                        onClick={() => handlePublish(course._id)}
                        className="bg-linear-to-r from-[#22C55E] to-[#178740] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        Publish
                      </button>
                    )}
                  </div>



<button
  onClick={() => navigate(`/teacher/course/${course._id}/quiz/create`)}
  className="bg-[#1B9AAA] text-white px-4 py-2 rounded-lg"
>
  Create Quiz
</button>

                  {/* Edit Link */}
                  <Link
                    to={`/teacher/courses/${course._id}/edit`}
                    className="block text-center text-sm text-[#1B9AAA] hover:text-[#16808D] font-medium transition-colors"
                  >
                    Edit Course Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MyCourses;