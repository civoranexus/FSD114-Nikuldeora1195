

// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useParams } from "react-router-dom";
// import usePageTitle from "../../utils/usePageTitle";

// const Certificate = () => {
//   usePageTitle("Course Certificate | EduVillage");

//   const { user } = useContext(AuthContext);
//   const { courseTitle } = useParams();

//   // ✅ Extract name from email
//   const studentName = user?.email
//     ? user.email.split("@")[0]
//     : "Student";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] px-4">
//       <div className="max-w-3xl w-full bg-white border-8 border-[#1B9AAA] rounded-xl shadow-2xl p-10 text-center">

//         <img
//           src="data:image/png;base64,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"
//           className="mx-auto mb-6 h-20"
//         />

//         <h1 className="text-4xl font-extrabold text-[#142C52] mb-4">
//           Certificate of Completion
//         </h1>

//         <p className="text-lg text-[#071426] mb-6">
//           This certifies that
//         </p>

//         <h2 className="text-3xl font-bold text-[#1B9AAA] mb-6 capitalize">
//           {studentName}
//         </h2>

//         <p className="text-lg text-[#071426] mb-6">
//           has successfully completed the course
//         </p>

//         <h3 className="text-2xl font-semibold text-[#142C52] mb-10">
//           {decodeURIComponent(courseTitle)}
//         </h3>

//         <button
//           onClick={() => window.print()}
//           className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
//         >
//           Print / Save as PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Certificate;


import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import usePageTitle from "../../utils/usePageTitle";

const Certificate = () => {
  usePageTitle("Course Certificate | EduVillage");

  const { user } = useContext(AuthContext);
  const { courseTitle } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] px-4">
      
      <div className="max-w-3xl w-full bg-white border-8 border-[#1B9AAA] rounded-xl shadow-2xl p-10 text-center">
        
        {/* Logo */}
        <img
          src="data:image/png;base64,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"

          alt="Civora Nexus Logo"
          className="mx-auto mb-6 h-20"
        />

        <h1 className="text-4xl font-extrabold text-[#142C52] tracking-wide mb-4">
          Certificate of Completion
        </h1>

        <p className="text-lg font-bold text-[#071426] mb-6">
          This certifies that
        </p>

        <h2 className="text-3xl font-bold text-[#1B9AAA] mb-6">
          {user?.name || "Student"}
        </h2>

        <p className="text-lg font-medium text-[#071426] mb-6">
          has successfully completed the course
        </p>

        <h3 className="text-2xl font-semibold text-[#142C52] mb-10">
          {decodeURIComponent(courseTitle || "Course")}
        </h3>

        <div className="flex justify-between items-center mt-10">
          <div className="text-left">
            <p className="font-semibold text-[#071426]">EduVillage</p>
            <p className="text-sm text-gray-500">Online Learning Platform</p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-[#071426]">
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">Date Issued</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => window.print()}
            className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
