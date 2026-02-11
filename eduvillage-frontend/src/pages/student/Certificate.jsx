// // import { useParams } from "react-router-dom";
// // import { useContext } from "react";
// // import { AuthContext } from "../../context/AuthContext";
// // import usePageTitle from "../../utils/usePageTitle";

// // const Certificate = () => {
// //   usePageTitle("Course Certificate | EduVillage");

// //   const { courseTitle, studentName } = useParams();

// //   // ✅ FIX: actually read AuthContext
// //   const { user } = useContext(AuthContext);

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] px-4">
// //       <div className="max-w-3xl w-full bg-white border-8 border-[#1B9AAA] rounded-xl shadow-2xl p-10 text-center">
        
// //         {/* Logo */}
// //         <img
// //           src="C:\Users\nikul\OneDrive\Desktop\FSD114-Nikuldeora1195\eduvillage-frontend\src\assets\Long_logo.png"
// //           alt="Civora Nexus Logo"
// //           className="mx-auto mb-6 h-20"
// //         />

// //         <h1 className="text-4xl font-extrabold text-[#142C52] tracking-wide mb-4">
// //           Certificate of Completion
// //         </h1>

// //         <p className="text-lg text-[#071426] mb-6">
// //           This certifies that
// //         </p>

// //         {/* ✅ REAL STUDENT NAME */}
// //         <h2 className="text-3xl font-bold text-[#1B9AAA] mb-6">
// //           {user?.name || decodeURIComponent(studentName)}
// //         </h2>

// //         <p className="text-lg text-[#071426] mb-6">
// //           has successfully completed the course
// //         </p>

// //         <h3 className="text-2xl font-semibold text-[#142C52] mb-10">
// //           {decodeURIComponent(courseTitle)}
// //         </h3>

// //         <div className="flex justify-between items-center mt-10">
// //           <div className="text-left">
// //             <p className="font-semibold text-[#071426]">EduVillage</p>
// //             <p className="text-sm text-gray-500">Online Learning Platform</p>
// //           </div>

// //           <div className="text-right">
// //             <p className="font-semibold text-[#071426]">
// //               {new Date().toLocaleDateString()}
// //             </p>
// //             <p className="text-sm text-gray-500">Date Issued</p>
// //           </div>
// //         </div>

// //         <div className="mt-8">
// //           <button
// //             onClick={() => window.print()}
// //             className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
// //           >
// //             Print / Save as PDF
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Certificate;



// import { useParams } from "react-router-dom";
// import usePageTitle from "../../utils/usePageTitle";

// const Certificate = () => {
//   usePageTitle("Course Certificate | EduVillage");

//   const { courseTitle, studentName } = useParams();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] px-4">
//       <div className="max-w-3xl w-full bg-white border-8 border-[#1B9AAA] rounded-xl shadow-2xl p-10 text-center">

//         <img
//           src="eduvillage-frontend\src\assets\Long_logo.png"
//           alt="Civora Nexus Logo"
//           className="mx-auto mb-6 h-20"
//         />

//         <h1 className="text-4xl font-extrabold text-[#142C52] mb-4">
//           Certificate of Completion
//         </h1>

//         <p className="text-lg text-[#071426] mb-6">
//           This certifies that
//         </p>

//         {/* ✅ REAL STUDENT NAME */}
//         <h2 className="text-3xl font-bold text-[#1B9AAA] mb-6">
//           {decodeURIComponent(studentName)}
//         </h2>

//         <p className="text-lg text-[#071426] mb-6">
//           has successfully completed the course
//         </p>

//         <h3 className="text-2xl font-semibold text-[#142C52] mb-10">
//           {decodeURIComponent(courseTitle)}
//         </h3>

//         <div className="flex justify-between items-center mt-10">
//           <div className="text-left">
//             <p className="font-semibold text-[#071426]">EduVillage</p>
//             <p className="text-sm text-gray-500">Online Learning Platform</p>
//           </div>

//           <div className="text-right">
//             <p className="font-semibold text-[#071426]">
//               {new Date().toLocaleDateString()}
//             </p>
//             <p className="text-sm text-gray-500">Date Issued</p>
//           </div>
//         </div>

//         <div className="mt-8">
//           <button
//             onClick={() => window.print()}
//             className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg font-semibold"
//           >
//             Print / Save as PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Certificate;
// //

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import usePageTitle from "../../utils/usePageTitle";

const Certificate = () => {
  usePageTitle("Course Certificate | EduVillage");

  const { user } = useContext(AuthContext);
  const { courseTitle } = useParams();

  // ✅ Extract name from email
  const studentName = user?.email
    ? user.email.split("@")[0]
    : "Student";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] px-4">
      <div className="max-w-3xl w-full bg-white border-8 border-[#1B9AAA] rounded-xl shadow-2xl p-10 text-center">

        <img
          src="/logo.png"
          alt="Civora Nexus Logo"
          className="mx-auto mb-6 h-20"
        />

        <h1 className="text-4xl font-extrabold text-[#142C52] mb-4">
          Certificate of Completion
        </h1>

        <p className="text-lg text-[#071426] mb-6">
          This certifies that
        </p>

        <h2 className="text-3xl font-bold text-[#1B9AAA] mb-6 capitalize">
          {studentName}
        </h2>

        <p className="text-lg text-[#071426] mb-6">
          has successfully completed the course
        </p>

        <h3 className="text-2xl font-semibold text-[#142C52] mb-10">
          {decodeURIComponent(courseTitle)}
        </h3>

        <button
          onClick={() => window.print()}
          className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;
