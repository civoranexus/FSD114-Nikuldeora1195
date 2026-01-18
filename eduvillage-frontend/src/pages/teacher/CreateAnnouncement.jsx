import { useState } from "react";
import { createAnnouncement } from "../../api/announcementApi";

const CreateAnnouncement = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createAnnouncement(form);
      alert("Announcement created");
      setForm({ title: "", message: "" });
    } catch (err) {
      setError("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Announcement</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Announcement"}
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncement;
