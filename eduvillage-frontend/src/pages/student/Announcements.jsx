import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/announcementApi";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements().then((res) => {
      setAnnouncements(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Announcements</h2>

      {announcements.length === 0 && (
        <p>No announcements yet.</p>
      )}

      {announcements.map((a) => (
        <div key={a._id}>
          <h4>{a.title}</h4>
          <p>{a.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
