import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TeacherLayout from "../../components/app/TeacherLayout";
import Card from "../../components/ui/Card";
import {
  getCourseById,
  updateCourse,
} from "../../api/teacherCourseApi";
import toast from "react-hot-toast";

const EditCourse = () => {
  const { id } = useParams(); // ✅ ONLY use id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCourseById(id)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateCourse(id, form);
      toast.success("Course updated");
      navigate("/teacher/courses");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <TeacherLayout title="Edit Course">
      <div className="max-w-2xl">
        <Card title="Edit Course">
          {loading ? (
            <p>Loading course...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="Course title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />

              <textarea
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Course description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                required
              />

              {/* COURSE CONTENT ACTIONS */}
              <div className="mt-10 border-t pt-6">
                <h2 className="text-lg font-semibold mb-3">
                  Course Content
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/courses/${id}/content`)
                  }
                  className="bg-[#142C52] text-white px-4 py-2 rounded"
                >
                  Manage Sections & Lessons
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/courses/${id}/add-section`)
                  }
                  className="ml-3 border px-4 py-2 rounded"
                >
                  + Add Section
                </button>
              </div>

              <button
                disabled={saving}
                className="bg-[#142C52] text-white px-6 py-2 rounded"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default EditCourse;
