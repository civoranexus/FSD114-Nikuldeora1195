import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/announcementApi";
import usePageTitle from "../../utils/usePageTitle";
import Card from "../../components/ui/Card";
import StudentLayout from "../../components/app/StudentLayout";

const Announcements = () => {
  usePageTitle("Announcements | EduVillage");

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnnouncements()
      .then((res) => {
        setAnnouncements(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <StudentLayout title="Announcements">
      <div className="max-w-3xl mx-auto space-y-6">
        {loading && <p>Loading announcements...</p>}

        {!loading && announcements.length === 0 && (
          <p className="text-gray-500">No announcements yet.</p>
        )}

        {announcements.map((a) => (
          <Card key={a._id}>
            <h3 className="text-lg font-semibold mb-1">{a.title}</h3>

            <p className="text-sm text-gray-600 mb-2">
              Posted by {a.createdBy?.name || "Instructor"} ·{" "}
              {new Date(a.createdAt).toLocaleDateString()}
            </p>

            <p className="text-gray-800">{a.message}</p>

            {a.course && (
              <p className="text-xs text-gray-500 mt-2">
                Course: {a.course.title}
              </p>
            )}
          </Card>
        ))}
      </div>
    </StudentLayout>
  );
};

export default Announcements;
