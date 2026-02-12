import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/teacherCourseApi";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Creating course...");
    try {
      const response = await createCourse(form);
      toast.success("Course created successfully! 🎉", { id: toastId });
      setForm({ title: "", description: "" });
      
      // Optionally navigate to the new course edit page
      if (response.data?._id) {
        setTimeout(() => {
          navigate(`/teacher/courses/${response.data._id}/edit`);
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to create course:", error);
      toast.error("Failed to create course", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#142C52] mb-2">Create New Course</h1>
            <p className="text-[#071426] opacity-70 text-lg">
              Start building your course and share your knowledge
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

        {/* Main Form Card */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 p-6 border-b border-[#CCE7EC]">
            <h2 className="text-2xl font-bold text-[#142C52] flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span>Course Information</span>
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
                placeholder="Enter course title (e.g., Introduction to Web Development)"
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
                rows={8}
                placeholder="Describe what students will learn in this course. Include key topics, skills, and outcomes..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                maxLength={500}
              />
              <p className="text-xs text-[#071426] opacity-60">
                {form.description.length}/500 characters
              </p>
            </div>

            {/* Tips Section */}
            <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 rounded-lg p-4 border border-[#CCE7EC]">
              <h3 className="font-semibold text-[#142C52] mb-2 flex items-center gap-2">
                <span>💡</span>
                <span>Tips for a Great Course Title & Description</span>
              </h3>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 list-disc list-inside">
                <li>Make the title clear, specific, and benefit-focused</li>
                <li>Include keywords that students might search for</li>
                <li>Highlight what makes your course unique</li>
                <li>Mention the skill level (beginner, intermediate, advanced)</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !form.title.trim() || !form.description.trim()}
                className="flex-1 bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Create Course</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/teacher/courses")}
                disabled={loading}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-[#CCE7EC] text-[#071426] hover:bg-[#F4F7FA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* What's Next Section */}
        <div className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-[#4C97A8]/20 to-[#1B9AAA]/10 p-6 border-b border-[#CCE7EC]">
            <h2 className="text-2xl font-bold text-[#142C52] flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <span>What's Next?</span>
            </h2>
          </div>

          <div className="p-8">
            <p className="text-[#071426] opacity-70 mb-6">
              After creating your course, you'll be able to:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="p-5 bg-[#F4F7FA] rounded-lg border-l-4 border-[#1B9AAA]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#142C52] mb-1">Add Sections</h3>
                    <p className="text-sm text-[#071426] opacity-70">
                      Organize your course into logical sections or modules
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 bg-[#F4F7FA] rounded-lg border-l-4 border-[#22C55E]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#22C55E] to-[#178740] rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#142C52] mb-1">Create Lessons</h3>
                    <p className="text-sm text-[#071426] opacity-70">
                      Add engaging lessons with text, images, and videos
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 bg-[#F4F7FA] rounded-lg border-l-4 border-[#4C97A8]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#4C97A8] to-[#02394A] rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#142C52] mb-1">Add Quizzes</h3>
                    <p className="text-sm text-[#071426] opacity-70">
                      Test student knowledge with interactive quizzes
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-5 bg-[#F4F7FA] rounded-lg border-l-4 border-[#CCE7EC]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#CCE7EC] to-[#4C97A8] rounded-full flex items-center justify-center shrink-0 text-[#142C52] font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#142C52] mb-1">Publish Course</h3>
                    <p className="text-sm text-[#071426] opacity-70">
                      Make your course available to students worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Creation Guidelines */}
        <div className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 rounded-xl p-6 border border-[#CCE7EC]">
          <h3 className="font-semibold text-[#142C52] mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Course Creation Best Practices</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[#142C52] mb-2 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Do:</span>
              </h4>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 ml-6 list-disc">
                <li>Start with clear learning objectives</li>
                <li>Break content into digestible chunks</li>
                <li>Use examples and real-world applications</li>
                <li>Include visual aids and multimedia</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#142C52] mb-2 flex items-center gap-2">
                <span className="text-red-500">✗</span>
                <span>Don't:</span>
              </h4>
              <ul className="text-sm text-[#071426] opacity-70 space-y-1 ml-6 list-disc">
                <li>Overwhelm with too much information</li>
                <li>Use unclear or vague language</li>
                <li>Skip logical progression of topics</li>
                <li>Forget to proofread your content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;