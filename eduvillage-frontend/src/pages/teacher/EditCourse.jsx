



import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourseById,
  updateCourse,
} from "../../api/teacherCourseApi";
import toast from "react-hot-toast";

const EditCourse = () => {
  const { id } = useParams();
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
      .catch(() => {
        toast.error("Failed to load course");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const toastId = toast.loading("Updating course...");
    try {
      await updateCourse(id, form);
      toast.success("Course updated successfully! ✅", { id: toastId });
      navigate("/teacher/courses");
    } catch {
      toast.error("Failed to update course", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
      </div>
    );
  }

  return (

    
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#142C52] mb-2">Edit Course</h1>
            <p className="text-[#071426] opacity-70 text-lg">
              Update course details and manage content
            </p>
          </div>
          <button
            onClick={() => navigate("/teacher/courses")}
            className="text-[#1B9AAA] hover:text-[#16808D] font-medium flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>Back to Courses</span>
          </button>
        </div>

        {/* Course Details Form */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 p-6 border-b border-[#CCE7EC]">
            <h2 className="text-2xl font-bold text-[#142C52] flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <span>Course Details</span>
            </h2>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Course Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-3 text-[#071426] focus:outline-none focus:border-[#1B9AAA] transition-colors placeholder-gray-400"
                placeholder="Enter course title (e.g., Advanced React Development)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                maxLength={100}
              />
              <p className="text-xs text-[#071426] opacity-60">
                {form.title.length}/100 characters
              </p>
            </div>

            {/* Course Description */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#142C52]">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-3 text-[#071426] focus:outline-none focus:border-[#1B9AAA] transition-colors placeholder-gray-400 resize-none"
                rows={6}
                placeholder="Describe what students will learn in this course..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                maxLength={500}
              />
              <p className="text-xs text-[#071426] opacity-60">
                {form.description.length}/500 characters
              </p>
            </div>

            {/* Save Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Save Changes</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/teacher/courses")}
                disabled={saving}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-[#CCE7EC] text-[#071426] hover:bg-[#F4F7FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Course Content Management */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-[#4C97A8]/20 to-[#1B9AAA]/10 p-6 border-b border-[#CCE7EC]">
            <h2 className="text-2xl font-bold text-[#142C52] flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span>Course Content Management</span>
            </h2>
          </div>

          {/* Content Actions */}
          <div className="p-8 space-y-4">
            <p className="text-[#071426] opacity-70 mb-6">
              Manage sections, lessons, and quizzes for your course
            </p>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Manage Content Button */}
              <button
                type="button"
                onClick={() => navigate(`/courses/${id}/content`)}
                className="group bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                    <span className="text-3xl">📖</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-amber-50 text-lg">Manage Content</p>
                    <p className="text-sm text-white opacity-90">View & edit sections and lessons</p>
                  </div>
                </div>
              </button>

              {/* Add Section Button */}
              <button
                type="button"
                onClick={() => navigate(`/courses/${id}/add-section`)}
                className="group bg-linear-to-r from-[#22C55E] to-[#178740] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                    <span className="text-3xl">➕</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-amber-50 text-lg">Add Section</p>
                    <p className="text-sm opacity-90 text-white">Create a new course section</p>
                  </div>
                </div>
              </button>

              {/* Create Quiz Button */}
              <button
                type="button"
                onClick={() => navigate(`/teacher/course/${id}/quiz/create`)}
                className="group bg-linear-to-r from-[#4C97A8] to-[#02394A] text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                    <span className="text-3xl">📝</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-amber-50 text-lg">Create Quiz</p>
                    <p className="text-sm  text-white opacity-90">Add assessments to your course</p>
                  </div>
                </div>
              </button>

              {/* View Analytics Button (Placeholder)
              <button
                type="button"
                onClick={() => toast.info("Analytics coming soon!")}
                className="group bg-linear-to-r from-[#CCE7EC] to-[#4C97A8] text-[#142C52] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/40 p-3 rounded-full group-hover:bg-white/60 transition-colors">
                    <span className="text-3xl">📊</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg">View Analytics</p>
                    <p className="text-sm opacity-70">Track student progress</p>
                  </div>
                </div>
              </button> */}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 rounded-xl p-6 border border-[#CCE7EC]">
          <h3 className="font-semibold text-[#142C52] mb-3 flex items-center gap-2">
            <span>💡</span>
            <span>Tips for Course Success</span>
          </h3>
          <ul className="text-sm text-[#071426] opacity-70 space-y-2 list-disc list-inside">
            <li>Use clear, descriptive titles that tell students what they'll learn</li>
            <li>Break content into logical sections with 3-5 lessons each</li>
            <li>Include visual aids and examples to enhance understanding</li>
            <li>Add quizzes to reinforce learning and track progress</li>
            <li>Keep lesson content concise and focused on one topic at a time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;