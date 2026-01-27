import { useState } from "react";
import TeacherLayout from "../../components/app/TeacherLayout";
import { createCourse } from "../../api/teacherCourseApi";
import Card from "../../components/ui/Card";


import toast from "react-hot-toast";

const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
  await createCourse(form);
  toast.success("Course created successfully");
  setForm({ title: "", description: "" });
} catch {
  toast.error("Failed to create course");
}

    try {
      await createCourse(form);
      setMessage("✅ Course created successfully");
      setForm({ title: "", description: "" });
    } catch {
      setMessage("❌ Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout title="Create Course">
      <div className="max-w-2xl">
        <Card title="New Course">
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
              placeholder="Course description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              required
            />

            <button
              disabled={loading}
              className="bg-[#142C52] text-white px-6 py-2 rounded"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>

            {message && (
              <p className="text-sm mt-2">{message}</p>
            )}
          </form>
        </Card>
      </div>
    </TeacherLayout>
  );
};

export default CreateCourse;
