// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-[#142C52] px-6 py-4 flex items-center justify-between shadow-md">
//       {/* Brand */}
//       <Link
//         to={user?.role === "teacher" ? "/teacher/dashboard" : "/dashboard"}
//         className="text-white font-semibold text-lg"
//       >
//         EduVillage
//       </Link>

//       {/* Links */}
//       <div className="flex items-center gap-6 text-white text-sm">
//         {user?.role === "student" && (
//           <>
//             <Link to="/dashboard" className="hover:underline">
//               Dashboard
//             </Link>
//             <Link to="/courses" className="hover:underline">
//               Courses
//             </Link>
//             <Link to="/my-courses" className="hover:underline">
//               My Learning
//             </Link>
//             <Link to="/announcements" className="hover:underline">
//               Announcements
//             </Link>
//           </>
//         )}

//         {user?.role === "teacher" && (
//           <>
//             <Link to="/teacher/dashboard" className="hover:underline">
//               Dashboard
//             </Link>
//             <Link to="/teacher/courses" className="hover:underline">
//               My Courses
//             </Link>
//             <Link
//               to="/teacher/announcements/create"
//               className="hover:underline"
//             >
//               Create Announcement
//             </Link>
//           </>
//         )}

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="ml-4 bg-white text-[#142C52] px-4 py-1 rounded-md font-medium hover:bg-gray-100"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";

// // Move NavLink component outside to fix React hooks error
// const NavLink = ({ to, children, isActive }) => (
//   <Link
//     to={to}
//     className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
//       isActive
//         ? "text-white bg-linear-to-r from-[#1B9AAA] to-[#16808D] shadow-lg"
//         : "text-[#CCE7EC] hover:text-white hover:bg-white/10"
//     }`}
//   >
//     {children}
//     {!isActive && (
//       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#1B9AAA] to-[#16808D] transition-all duration-300 group-hover:w-full"></span>
//     )}
//   </Link>
// );

// // Move MobileNavLink component outside to fix React hooks error
// const MobileNavLink = ({ to, children, isActive, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className={`block px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
//       isActive
//         ? "text-white bg-linear-to-r from-[#1B9AAA] to-[#16808D] shadow-lg"
//         : "text-[#CCE7EC] hover:text-white hover:bg-white/10"
//     }`}
//   >
//     {children}
//   </Link>
// );

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu when route changes - Fixed to avoid setState in effect
//   useEffect(() => {
//     const closeMobileMenu = () => {
//       if (isMobileMenuOpen) {
//         setIsMobileMenuOpen(false);
//       }
//     };
    
//     // Use timeout to avoid setState directly in effect
//     const timer = setTimeout(closeMobileMenu, 0);
//     return () => clearTimeout(timer);
//   }, [location.pathname, isMobileMenuOpen]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   const handleMobileLinkClick = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-[#142C52]/95 backdrop-blur-lg shadow-2xl"
//           : "bg-linear-to-r from-[#02394A] via-[#012136] to-[#01181F] shadow-lg"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Brand Logo */}
//           <Link
//             to={user?.role === "teacher" ? "/teacher/dashboard" : "/dashboard"}
//             className="flex items-center space-x-3 group"
//           >
//             <div className="bg-linear-to-br from-[#1B9AAA] to-[#16808D] p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
//               <span className="text-white text-xl font-bold">📚</span>
//             </div>
//             <span className="text-white font-bold text-xl tracking-tight group-hover:text-[#CCE7EC] transition-colors">
//               EduVillage
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-2">
//             {user?.role === "student" && (
//               <>
//                 <NavLink to="/dashboard" isActive={isActive("/dashboard")}>
//                   Dashboard
//                 </NavLink>
//                 <NavLink to="/courses" isActive={isActive("/courses")}>
//                   Courses
//                 </NavLink>
//                 <NavLink to="/my-courses" isActive={isActive("/my-courses")}>
//                   My Learning
//                 </NavLink>
//                 <NavLink to="/announcements" isActive={isActive("/announcements")}>
//                   Announcements
//                 </NavLink>
//               </>
//             )}

//             {user?.role === "teacher" && (
//               <>
//                 <NavLink to="/teacher/dashboard" isActive={isActive("/teacher/dashboard")}>
//                   Dashboard
//                 </NavLink>
//                 <NavLink to="/teacher/courses" isActive={isActive("/teacher/courses")}>
//                   My Courses
//                 </NavLink>
//                 <NavLink to="/teacher/announcements/create" isActive={isActive("/teacher/announcements/create")}>
//                   Announcements
//                 </NavLink>
//               </>
//             )}

//             {/* User Profile & Logout */}
//             <div className="ml-4 flex items-center space-x-3">
//               <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
//                 <div className="w-8 h-8 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shadow-lg">
//                   <span className="text-white text-sm font-bold">
//                     {user?.name?.charAt(0).toUpperCase() || "U"}
//                   </span>
//                 </div>
//                 <span className="text-[#CCE7EC] text-sm font-medium hidden lg:block">
//                   {user?.name || "User"}
//                 </span>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="bg-linear-to-r from-[#EF4444] to-[#EB1414] text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMobileMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-all duration-300 ${
//           isMobileMenuOpen ? "max-h-screen" : "max-h-0"
//         }`}
//       >
//         <div className="px-4 py-4 bg-linear-to-b from-[#012136] to-[#01181F] border-t border-white/10 space-y-2">
//           {user?.role === "student" && (
//             <>
//               <MobileNavLink 
//                 to="/dashboard" 
//                 isActive={isActive("/dashboard")}
//                 onClick={handleMobileLinkClick}
//               >
//                 Dashboard
//               </MobileNavLink>
//               <MobileNavLink 
//                 to="/courses" 
//                 isActive={isActive("/courses")}
//                 onClick={handleMobileLinkClick}
//               >
//                 Courses
//               </MobileNavLink>
//               <MobileNavLink 
//                 to="/my-courses" 
//                 isActive={isActive("/my-courses")}
//                 onClick={handleMobileLinkClick}
//               >
//                 My Learning
//               </MobileNavLink>
//               <MobileNavLink 
//                 to="/announcements" 
//                 isActive={isActive("/announcements")}
//                 onClick={handleMobileLinkClick}
//               >
//                 Announcements
//               </MobileNavLink>
//             </>
//           )}

//           {user?.role === "teacher" && (
//             <>
//               <MobileNavLink 
//                 to="/teacher/dashboard" 
//                 isActive={isActive("/teacher/dashboard")}
//                 onClick={handleMobileLinkClick}
//               >
//                 Dashboard
//               </MobileNavLink>
//               <MobileNavLink 
//                 to="/teacher/courses" 
//                 isActive={isActive("/teacher/courses")}
//                 onClick={handleMobileLinkClick}
//               >
//                 My Courses
//               </MobileNavLink>
//               <MobileNavLink 
//                 to="/teacher/announcements/create" 
//                 isActive={isActive("/teacher/announcements/create")}
//                 onClick={handleMobileLinkClick}
//               >
//                 Announcements
//               </MobileNavLink>
//             </>
//           )}

//           {/* Mobile User Info */}
//           <div className="pt-4 border-t border-white/10 space-y-3">
//             <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg">
//               <div className="w-10 h-10 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shadow-lg">
//                 <span className="text-white text-lg font-bold">
//                   {user?.name?.charAt(0).toUpperCase() || "U"}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-white font-medium">{user?.name || "User"}</p>
//                 <p className="text-[#CCE7EC] text-sm opacity-70">{user?.email}</p>
//               </div>
//             </div>

//             <button
//               onClick={handleLogout}
//               className="w-full bg-linear-to-r from-[#EF4444] to-[#EB1414] text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-white min-h-screen p-6 sticky top-0 shadow-lg border-r border-[#CCE7EC]">
      
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="bg-linear-to-br from-[#1B9AAA] to-[#16808D] p-2 rounded-lg">
            <span className="text-xl font-bold text-white">📚</span>
          </div>
          <span className="text-xl font-bold text-[#142C52]">
            EduVillage
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {/* ================= STUDENT LINKS ================= */}
        {user?.role === "student" && (
          <>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/courses"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/courses")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📚</span>
              <span className="font-medium">Courses</span>
            </Link>

            <Link
              to="/my-courses"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/my-courses")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📖</span>
              <span className="font-medium">My Learning</span>
            </Link>

            <Link
              to="/announcements"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/announcements")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📢</span>
              <span className="font-medium">Announcements</span>
            </Link>
          </>
        )}

        {/* ================= TEACHER LINKS ================= */}
        {user?.role === "teacher" && (
          <>
            <Link
              to="/teacher/dashboard"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/teacher/dashboard")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/teacher/courses"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/teacher/courses")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📚</span>
              <span className="font-medium">Courses</span>
            </Link>

            <Link
              to="/teacher/students"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/teacher/students")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">👥</span>
              <span className="font-medium">Students</span>
            </Link>
            

            <Link
              to="/teacher/announcements/create"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/teacher/announcements/create")
                  ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                  : "text-[#071426] hover:bg-[#CCE7EC]"
              }`}
            >
              <span className="text-xl">📢</span>
              <span className="font-medium">Announcements</span>
            </Link>
          </>
        )}

        {/* ================= USER PROFILE ================= */}
        <div className="pt-6 mt-6 border-t border-[#CCE7EC]">
          <div className="flex items-center space-x-3 px-4 py-3 bg-[#F4F7FA] rounded-lg mb-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-[#142C52] font-medium">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#071426] hover:bg-red-50 hover:text-[#EF4444] transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
