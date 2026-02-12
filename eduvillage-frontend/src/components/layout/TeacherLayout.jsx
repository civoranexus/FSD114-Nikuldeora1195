// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const TeacherLayout = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useContext(AuthContext);

//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#F4F7FA]">
//       <div className="flex">

//         {/* Sidebar */}
//         <aside className="w-64 bg-white min-h-screen p-6 sticky top-0 shadow-lg border-r border-[#CCE7EC]">
          
//           {/* Logo */}
//           <div className="mb-8">
//             <div className="flex items-center space-x-2">
//               <div className="bg-linear-to-br from-[#1B9AAA] to-[#16808D] p-2 rounded-lg">
//                 <span className="text-xl font-bold text-white">📚</span>
//               </div>
//               <span className="text-xl font-bold text-[#142C52]">
//                 EduVillage
//               </span>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-2">
//             <Link
//               to="/teacher/dashboard"
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive("/teacher/dashboard")
//                   ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                   : "text-[#071426] hover:bg-[#CCE7EC]"
//               }`}
//             >
//               <span className="text-xl">📊</span>
//               <span className="font-medium">Dashboard</span>
//             </Link>

//             <Link
//               to="/teacher/courses"
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive("/teacher/courses")
//                   ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                   : "text-[#071426] hover:bg-[#CCE7EC]"
//               }`}
//             >
//               <span className="text-xl">📚</span>
//               <span className="font-medium">Courses</span>
//             </Link>

//             <Link
//               to="/teacher/students"
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive("/teacher/students")
//                   ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                   : "text-[#071426] hover:bg-[#CCE7EC]"
//               }`}
//             >
//               <span className="text-xl">👥</span>
//               <span className="font-medium">Students</span>
//             </Link>

//             <Link
//               to="/teacher/announcements/create"
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive("/teacher/announcements/create")
//                   ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                   : "text-[#071426] hover:bg-[#CCE7EC]"
//               }`}
//             >
//               <span className="text-xl">📢</span>
//               <span className="font-medium">Announcements</span>
//             </Link>

//             <Link
//               to="/teacher/results"
//               className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive("/teacher/results")
//                   ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
//                   : "text-[#071426] hover:bg-[#CCE7EC]"
//               }`}
//             >
//               <span className="text-xl">📈</span>
//               <span className="font-medium">Results</span>
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-red-50 hover:text-[#EF4444] transition-colors"
//             >
//               <span className="text-xl">🚪</span>
//               <span className="font-medium">Logout</span>
//             </button>
//           </nav>
//         </aside>

//         {/* Page Content */}
//         <main className="flex-1 p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default TeacherLayout;
