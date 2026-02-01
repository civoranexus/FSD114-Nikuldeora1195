import { useState } from "react";
import { createAnnouncement } from "../../api/announcementApi";
import TeacherLayout from "../../components/app/TeacherLayout";

const CreateAnnouncement = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createAnnouncement(form);
      setSuccess("Announcement posted successfully");
      setForm({ title: "", message: "" });
    } catch {
      setError("Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout title="Create Announcement">
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold mb-4">New Announcement</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="Announcement message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#142C52] text-white px-4 py-2 rounded"
          >
            {loading ? "Posting..." : "Post Announcement"}
          </button>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default CreateAnnouncement;
