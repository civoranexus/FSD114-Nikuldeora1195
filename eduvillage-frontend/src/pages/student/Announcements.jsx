import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/announcementApi";
import usePageTitle from "../../utils/usePageTitle";
import Card from "../../components/ui/Card";

const Announcements = () => {
  usePageTitle("Announcements | EduVillage");

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements().then((res) => {
      setAnnouncements(res.data);
    });
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Announcements</h2>

      {announcements.length === 0 && (
        <p>No announcements yet.</p>
      )}

      {announcements.map((a) => (
        <Card key={a._id} title={a.title}>
          <p>{a.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Announcements;
