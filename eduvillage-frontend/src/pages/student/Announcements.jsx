// import { useEffect, useState } from "react";
// import { getAnnouncements } from "../../api/announcementApi";
// import usePageTitle from "../../utils/usePageTitle";
// import Card from "../../components/ui/Card";
// import StudentLayout from "../../components/app/StudentLayout";

// const Announcements = () => {
//   usePageTitle("Announcements | EduVillage");

//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAnnouncements()
//       .then((res) => {
//         setAnnouncements(res.data);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <StudentLayout title="Announcements">
//       <div className="max-w-3xl mx-auto space-y-6">
//         {loading && <p>Loading announcements...</p>}

//         {!loading && announcements.length === 0 && (
//           <p className="text-gray-500">No announcements yet.</p>
//         )}

//         {announcements.map((a) => (
//           <Card key={a._id}>
//             <h3 className="text-lg font-semibold mb-1">{a.title}</h3>

//             <p className="text-sm text-gray-600 mb-2">
//               Posted by {a.createdBy?.name || "Instructor"} ·{" "}
//               {new Date(a.createdAt).toLocaleDateString()}
//             </p>

//             <p className="text-gray-800">{a.message}</p>

//             {a.course && (
//               <p className="text-xs text-gray-500 mt-2">
//                 Course: {a.course.title}
//               </p>
//             )}
//           </Card>
//         ))}
//       </div>
//     </StudentLayout>
//   );
// };

// export default Announcements;



import { useEffect, useState, useMemo } from "react";
import { getAnnouncements } from "../../api/announcementApi";
import usePageTitle from "../../utils/usePageTitle";
import StudentLayout from "../../components/app/StudentLayout";

const Announcements = () => {
  usePageTitle("Announcements | EduVillage");

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, recent, older

  useEffect(() => {
    getAnnouncements()
      .then((res) => {
        setAnnouncements(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Calculate date once using useMemo to avoid impure function calls in render
  const sevenDaysAgo = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }, []);

  // Filter announcements by date
  const filteredAnnouncements = useMemo(() => {
    if (filter === "recent") {
      return announcements.filter(
        (a) => new Date(a.createdAt) >= sevenDaysAgo
      );
    } else if (filter === "older") {
      return announcements.filter(
        (a) => new Date(a.createdAt) < sevenDaysAgo
      );
    }
    return announcements;
  }, [announcements, filter, sevenDaysAgo]);

  // Calculate recent count using useMemo
  const recentCount = useMemo(() => {
    return announcements.filter(
      (a) => new Date(a.createdAt) >= sevenDaysAgo
    ).length;
  }, [announcements, sevenDaysAgo]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get announcement icon based on content or type
  const getAnnouncementIcon = (announcement) => {
    const title = announcement.title.toLowerCase();
    if (title.includes("exam") || title.includes("test") || title.includes("quiz")) return "📝";
    if (title.includes("deadline") || title.includes("due")) return "⏰";
    if (title.includes("new") || title.includes("launch")) return "🚀";
    if (title.includes("event") || title.includes("webinar")) return "🎯";
    if (title.includes("update") || title.includes("change")) return "🔄";
    if (title.includes("holiday") || title.includes("break")) return "🎉";
    return "📢";
  };

  if (loading) {
    return (
      <StudentLayout title="Announcements">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="Announcements">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-linear-to-r from-[#103642] via-[#025992] to-[#105c73] rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-5xl">📢</span>
            <div>
              <h1 className="text-3xl text-cyan-600 font-bold">Announcements</h1>
              <p className="text-[#CCE7EC] text-lg">
                Stay updated with the latest news and updates
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#1B9AAA] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#5b8acc] opacity-70 text-sm font-medium mb-1">
                  Total Announcements
                </p>
                <p className="text-3xl font-bold text-[#142C52]">
                  {announcements.length}
                </p>
              </div>
              <div className="bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] p-3 rounded-full">
                <span className="text-3xl">📬</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#22C55E] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#071426] opacity-70 text-sm font-medium mb-1">
                  This Week
                </p>
                <p className="text-3xl font-bold text-[#142C52]">
                  {recentCount}
                </p>
              </div>
              <div className="bg-linear-to-br from-[#22C55E] to-[#178740] p-3 rounded-full">
                <span className="text-3xl">🆕</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border-l-4 border-[#4C97A8] hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#071426] opacity-70 text-sm font-medium mb-1">
                  Latest Update
                </p>
                <p className="text-sm font-bold text-[#142C52]">
                  {announcements.length > 0
                    ? formatDate(announcements[0].createdAt)
                    : "N/A"}
                </p>
              </div>
              <div className="bg-linear-to-br from-[#4C97A8] to-[#02394A] p-3 rounded-full">
                <span className="text-3xl">📅</span>
              </div>
            </div>
          </div>
        </div>

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
            All ({announcements.length})
          </button>
          <button
            onClick={() => setFilter("recent")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "recent"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            Recent (Last 7 days)
          </button>
          <button
            onClick={() => setFilter("older")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === "older"
                ? "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white shadow-md"
                : "text-[#071426] hover:bg-[#F4F7FA]"
            }`}
          >
            Older
          </button>
        </div>

        {/* Announcements Timeline */}
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-[#142C52] mb-2">
              No Announcements
            </h3>
            <p className="text-[#071426] opacity-70">
              {filter === "all"
                ? "There are no announcements yet. Check back later!"
                : `No ${filter} announcements found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement, index) => (
              <div
                key={announcement._id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Timeline Line */}
                {index !== filteredAnnouncements.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-linear-to-b from-[#1B9AAA] to-[#CCE7EC] opacity-30"></div>
                )}

                <div className="flex gap-4">
                  {/* Icon Circle */}
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="text-2xl">
                        {getAnnouncementIcon(announcement)}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white/90 backdrop-blur-md rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#1B9AAA] group-hover:-translate-y-1">
                    {/* Card Header */}
                    <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/20 p-4 border-b border-[#CCE7EC]">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-bold text-[#142C52] group-hover:text-[#1B9AAA] transition-colors flex-1">
                          {announcement.title}
                        </h3>
                        <span className="text-sm font-medium text-[#1B9AAA] whitespace-nowrap">
                          {formatDate(announcement.createdAt)}
                        </span>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 mt-2 text-sm text-[#071426] opacity-70">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {announcement.createdBy?.name
                                ?.charAt(0)
                                .toUpperCase() || "I"}
                            </span>
                          </div>
                          <span className="font-medium">
                            {announcement.createdBy?.name || "Instructor"}
                          </span>
                        </div>

                        {announcement.course && (
                          <>
                            <span className="text-[#CCE7EC]">•</span>
                            <div className="flex items-center gap-1">
                              <span>📚</span>
                              <span className="font-medium">
                                {announcement.course.title}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <p className="text-[#071426] leading-relaxed whitespace-pre-line">
                        {announcement.message}
                      </p>

                      {/* Course Badge */}
                      {announcement.course && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-linear-to-r from-[#CCE7EC] to-[#4C97A8]/30 px-4 py-2 rounded-lg">
                          <span className="text-lg">🎓</span>
                          <span className="text-sm font-semibold text-[#02394A]">
                            Related to: {announcement.course.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
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
    </StudentLayout>
  );
};

export default Announcements;