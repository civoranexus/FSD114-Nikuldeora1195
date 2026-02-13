// import { useState } from "react";
// import { createAnnouncement } from "../../api/announcementApi";
// import TeacherLayout from "../../components/app/TeacherLayout";

// const CreateAnnouncement = () => {
//   const [form, setForm] = useState({
//     title: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       await createAnnouncement(form);
//       setSuccess("Announcement posted successfully");
//       setForm({ title: "", message: "" });
//     } catch {
//       setError("Failed to create announcement");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <TeacherLayout title="Create Announcement">
//       <div className="max-w-xl">
//         <h2 className="text-xl font-semibold mb-4">New Announcement</h2>

//         {error && <p className="text-red-600 mb-2">{error}</p>}
//         {success && <p className="text-green-600 mb-2">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full border px-3 py-2 rounded"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) =>
//               setForm({ ...form, title: e.target.value })
//             }
//             required
//           />

//           <textarea
//             className="w-full border px-3 py-2 rounded"
//             rows={4}
//             placeholder="Announcement message"
//             value={form.message}
//             onChange={(e) =>
//               setForm({ ...form, message: e.target.value })
//             }
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-[#142C52] text-white px-4 py-2 rounded"
//           >
//             {loading ? "Posting..." : "Post Announcement"}
//           </button>
//         </form>
//       </div>
//     </TeacherLayout>
//   );
// };

// export default CreateAnnouncement;





import { useState } from "react";
import { createAnnouncement } from "../../api/announcementApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CreateAnnouncement = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Posting announcement...");

    try {
      await createAnnouncement(form);
      toast.success("Announcement posted successfully! 🎉", { id: toastId });
      setForm({ title: "", message: "" });
    } catch {
      toast.error("Failed to create announcement", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const characterCount = form.message.length;
  const maxCharacters = 1000;

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#142C52] mb-2">
              Create Announcement
            </h1>
            <p className="text-[#071426] opacity-70 text-lg">
              Share important updates with your students
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

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-[#CCE7EC] shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full">
                <span className="text-2xl">📢</span>
              </div>
              <div>
                <p className="text-xs text-[#071426] opacity-60">Broadcast</p>
                <p className="font-bold text-[#142C52]">All Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#CCE7EC] shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-[#1B9AAA]/20 to-[#16808D]/20 p-3 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="text-xs text-[#071426] opacity-60">Delivery</p>
                <p className="font-bold text-[#142C52]">Instant</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#CCE7EC] shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-[#22C55E]/20 to-[#178740]/20 p-3 rounded-full">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p className="text-xs text-[#071426] opacity-60">Status</p>
                <p className="font-bold text-[#142C52]">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-[#CCE7EC] to-[#4C97A8]/30 p-6 border-b border-[#CCE7EC]">
            <h2 className="text-2xl font-bold text-[#142C52] flex items-center gap-3">
              <span className="text-3xl">✍️</span>
              <span>Announcement Details</span>
            </h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-3 text-[#071426] focus:outline-none focus:border-[#1B9AAA] transition-colors placeholder-gray-400"
                placeholder="Enter announcement title (e.g., Exam Schedule Update)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                maxLength={100}
              />
              <p className="text-xs text-[#071426] opacity-60">
                {form.title.length}/100 characters
              </p>
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-3 text-[#071426] focus:outline-none focus:border-[#1B9AAA] transition-colors placeholder-gray-400 resize-none"
                rows={8}
                placeholder="Write your announcement message here... Be clear and concise to ensure students understand the information."
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                maxLength={maxCharacters}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#071426] opacity-60">
                  {characterCount}/{maxCharacters} characters
                </p>
                {characterCount > maxCharacters * 0.9 && (
                  <p className="text-xs text-[#EF4444] font-medium">
                    Approaching character limit
                  </p>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 rounded-lg p-4 border border-[#CCE7EC]">
              <h3 className="font-semibold text-[#142C52] mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Tips for Effective Announcements</span>
              </h3>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 list-disc list-inside">
                <li>Keep your message clear and concise</li>
                <li>Include important dates and deadlines</li>
                <li>Use a professional and friendly tone</li>
                <li>Proofread before posting</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !form.title.trim() || !form.message.trim()}
                className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    <span>Post Announcement</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setForm({ title: "", message: "" })}
                disabled={loading}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-[#CCE7EC] text-[#071426] hover:bg-[#F4F7FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        {(form.title || form.message) && (
          <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
            <div className="bg-linear-to-r from-[#4C97A8]/20 to-[#1B9AAA]/10 p-4 border-b border-[#CCE7EC]">
              <h3 className="font-semibold text-[#142C52] flex items-center gap-2">
                <span>👁️</span>
                <span>Live Preview</span>
              </h3>
            </div>
            <div className="p-6">
              {form.title && (
                <h4 className="text-xl font-bold text-[#142C52] mb-3">
                  {form.title}
                </h4>
              )}
              {form.message && (
                <p className="text-[#071426] opacity-80 whitespace-pre-line leading-relaxed">
                  {form.message}
                </p>
              )}
              {!form.title && !form.message && (
                <p className="text-[#071426] opacity-40 italic">
                  Start typing to see a preview...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Recent Announcements Summary */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#142C52] mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Announcement Guidelines</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-[#142C52] flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Do:</span>
              </h4>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 ml-6 list-disc">
                <li>Be specific about dates and times</li>
                <li>Highlight urgent information</li>
                <li>Include action items clearly</li>
                <li>Use proper grammar and spelling</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-[#142C52] flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Don't:</span>
              </h4>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 ml-6 list-disc">
                <li>Use all caps (appears aggressive)</li>
                <li>Post personal information</li>
                <li>Make announcements too lengthy</li>
                <li>Forget to proofread</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;