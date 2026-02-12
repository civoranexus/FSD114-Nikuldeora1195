import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  createLesson,
  getCourseContent,
} from "../../api/contentApi";
import { completeLesson } from "../../api/courseApi";
import toast from "react-hot-toast";

import QuizSection from "../student/QuizSection";

import { getQuizByCourse } from "../../api/courseApi";



const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [sections, setSections] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonImage, setLessonImage] = useState("");
  const [activeSection, setActiveSection] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [loading, setLoading] = useState(true);
const [quiz, setQuiz] = useState(null);
const { id } = useParams();



  // ✅ FETCH CONTENT
  useEffect(() => {
    if (!courseId) return;

    const fetchContent = async () => {
      try {
        const res = await getCourseContent(courseId);
        setSections(res.data);
        // Auto-expand all sections
        setExpandedSections(new Set(res.data.map(s => s._id)));
      } catch (err) {
        console.error("Failed to load course content", err);
        toast.error("Failed to load course content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [courseId]);

useEffect(() => {
  const loadQuiz = async () => {
    try {
      const res = await getQuizByCourse(courseId);
      setQuiz(res.data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.log("No quiz found for this course");
    }
  };

  loadQuiz();
}, [courseId]);



useEffect(() => {
  getQuizByCourse(courseId)
    .then(res => setQuiz(res.data))
    .catch(() => {});
}, [courseId]);





  // Toggle section expand/collapse
  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // ✅ ADD LESSON (Teacher)
  const handleAddLesson = async () => {
    if (!lessonTitle || !lessonContent || !activeSection) {
      toast.error("Please fill in lesson title and content");
      return;
    }

    const toastId = toast.loading("Adding lesson...");
    try {
      await createLesson({
        title: lessonTitle,
        content: lessonContent,
        imageUrl: lessonImage,
        sectionId: activeSection,
      });

      toast.success("Lesson added successfully! 🎉", { id: toastId });

      setLessonTitle("");
      setLessonContent("");
      setLessonImage("");
      setActiveSection(null);

      const res = await getCourseContent(courseId);
      setSections(res.data);
    } catch (error) {
      console.error("Failed to add lesson:", error);
      toast.error("Failed to add lesson", { id: toastId });
    }
  };

  // ✅ COMPLETE LESSON (Student)
  const handleCompleteLesson = async (lessonId) => {
    const toastId = toast.loading("Marking as complete...");
    try {
      await completeLesson(lessonId);
      setCompletedLessons((prev) => [...prev, lessonId]);
      toast.success("Lesson completed! 🎉", { id: toastId });
    } catch (error) {
      console.error("Lesson completion failed:", error);
      toast.error("Failed to mark lesson as complete", { id: toastId });
    }
  };

  // Calculate progress
  const totalLessons = sections.reduce((sum, section) => sum + section.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B9AAA]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-linear-to-r from-[#02394A] via-[#1374b5] to-[#317d95] rounded-xl p-8 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-cyan-100 mb-2">Course Content</h1>
              <p className="text-[#CCE7EC] text-lg">
                {user?.role === "teacher" 
                  ? "Manage your course sections and lessons"
                  : "Learn at your own pace"}
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-[#CCE7EC] hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          </div>

          {/* Progress Bar (Student Only) */}
          {user?.role === "student" && totalLessons > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#CCE7EC]">Your Progress</span>
                <span className="font-bold">{completedCount} / {totalLessons} lessons</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-[#22C55E] to-[#178740] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-right text-sm font-bold">{progressPercentage}% Complete</p>
            </div>
          )}
        </div>

        {/* Add Section Button (Teacher) */}
        {user?.role === "teacher" && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/courses/${courseId}/add-section`)}
              className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span className="text-xl">➕</span>
              <span>Add Section</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {sections.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#CCE7EC] shadow-lg">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-[#142C52] mb-2">No Content Yet</h3>
            <p className="text-[#071426] opacity-70 mb-6">
              {user?.role === "teacher"
                ? "Start building your course by adding sections and lessons"
                : "This course doesn't have any content yet"}
            </p>
            {user?.role === "teacher" && (
              <button
                onClick={() => navigate(`/courses/${courseId}/add-section`)}
                className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Add Your First Section
              </button>

              
            )}

           <button
  type="button"
  onClick={() => navigate(`/teacher/course/${id}/quiz/create`)}
  className="bg-[#1B9AAA] text-white px-4 py-2 rounded-lg mt-4"
>
  Create Quiz
</button>

          </div>
        ) : (
          /* Sections */
          <div className="space-y-6">
            {sections.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(section._id);
              const sectionLessons = section.lessons.length;
              const completedInSection = section.lessons.filter(l => 
                completedLessons.includes(l._id)
              ).length;

              return (
                <div
                  key={section._id}
                  className="bg-white rounded-xl border border-[#CCE7EC] shadow-lg overflow-hidden"
                >
                  {/* Section Header */}
                  <div
                    onClick={() => toggleSection(section._id)}
                    className="bg-linear-to-r from-[#CCE7EC]/30 to-[#4C97A8]/10 p-6 cursor-pointer hover:from-[#CCE7EC]/50 hover:to-[#4C97A8]/20 transition-all border-b border-[#CCE7EC]"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-linear-to-br from-[#1B9AAA] to-[#16808D] rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-lg">{sectionIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-[#142C52]">{section.title}</h2>
                          <p className="text-sm text-[#071426] opacity-70">
                            {sectionLessons} {sectionLessons === 1 ? 'lesson' : 'lessons'}
                            {user?.role === "student" && sectionLessons > 0 && (
                              <span className="ml-2">
                                • {completedInSection} completed
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {user?.role === "student" && sectionLessons > 0 && (
                          <div className="text-right">
                            <div className="w-32 bg-[#F4F7FA] rounded-full h-2 overflow-hidden border border-[#CCE7EC]">
                              <div
                                className="bg-linear-to-r from-[#1B9AAA] to-[#16808D] h-2 rounded-full transition-all"
                                style={{ width: `${(completedInSection / sectionLessons) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        <span className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Section Content */}
                  {isExpanded && (
                    <div className="p-6 space-y-4">
                      {/* Lessons */}
                      {section.lessons.length === 0 ? (
                        <p className="text-center text-[#071426] opacity-60 py-8">
                          No lessons in this section yet
                        </p>
                      ) : (
                        section.lessons.map((lesson, lessonIndex) => {
                          const isCompleted = completedLessons.includes(lesson._id);

                          return (
                            <div
                              key={lesson._id}
                              className="p-5 bg-[#F4F7FA] rounded-lg border-l-4 border-[#1B9AAA] hover:shadow-md transition-all"
                            >
                              {/* Lesson Header */}
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className="w-8 h-8 bg-white border-2 border-[#1B9AAA] rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-[#1B9AAA] font-bold text-sm">
                                      {lessonIndex + 1}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-[#142C52] mb-2">
                                      {lesson.title}
                                    </h3>
                                    <p className="text-[#071426] opacity-80 leading-relaxed whitespace-pre-line">
                                      {lesson.content}
                                    </p>
                                  </div>
                                </div>

                                {/* Complete Button (Student) */}
                                {user?.role === "student" && (
                                  <button
                                    onClick={() => handleCompleteLesson(lesson._id)}
                                    disabled={isCompleted}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all shrink-0 ml-4 ${
                                      isCompleted
                                        ? "bg-linear-to-r from-[#22C55E] to-[#178740] text-white cursor-default"
                                        : "bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white hover:shadow-lg"
                                    }`}
                                  >
                                    {isCompleted ? "✓ Completed" : "Mark Complete"}
                                  </button>
                                )}
                              </div>

                              {/* Lesson Image */}
                              {lesson.imageUrl && (
                                <div className="mt-4">
                                  <img
                                    src={lesson.imageUrl}
                                    alt={lesson.title}
                                    className="w-full max-h-96 object-cover rounded-lg border-2 border-[#CCE7EC] shadow-md"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}


                      
                      {/* Add Lesson Form (Teacher) */}
                      {user?.role === "teacher" && (
                        <div className="mt-6 p-6 bg-linear-to-br from-[#CCE7EC]/30 to-[#4C97A8]/10 rounded-xl border-2 border-dashed border-[#1B9AAA]">
                          <h4 className="font-semibold text-[#142C52] mb-4 flex items-center gap-2">
                            <span className="text-xl">➕</span>
                            <span>Add New Lesson to This Section</span>
                          </h4>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#142C52] mb-2">
                                Lesson Title <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-2 focus:outline-none focus:border-[#1B9AAA] transition-colors"
                                placeholder="Enter lesson title"
                                value={activeSection === section._id ? lessonTitle : ""}
                                onChange={(e) => {
                                  setActiveSection(section._id);
                                  setLessonTitle(e.target.value);
                                }}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#142C52] mb-2">
                                Lesson Content <span className="text-red-500">*</span>
                              </label>
                              <textarea
                                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1B9AAA] transition-colors resize-none"
                                placeholder="Write lesson content here..."
                                rows={6}
                                value={activeSection === section._id ? lessonContent : ""}
                                onChange={(e) => {
                                  setActiveSection(section._id);
                                  setLessonContent(e.target.value);
                                }}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-[#142C52] mb-2">
                                Image URL (Optional)
                              </label>
                              <input
                                type="url"
                                className="w-full border-2 border-[#CCE7EC] rounded-lg px-4 py-2 focus:outline-none focus:border-[#1B9AAA] transition-colors"
                                placeholder="https://example.com/image.jpg"
                                value={activeSection === section._id ? lessonImage : ""}
                                onChange={(e) => {
                                  setActiveSection(section._id);
                                  setLessonImage(e.target.value);
                                }}
                              />
                            </div>

                            <button
                              onClick={handleAddLesson}
                              disabled={!lessonTitle || !lessonContent || activeSection !== section._id}
                              className="w-full bg-linear-to-r from-[#1B9AAA] to-[#16808D] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add Lesson
                            </button>
                          </div>
                        </div>
                      )}
                      {quiz && (
  <div className="mt-10">
    <QuizSection quiz={quiz} />
  </div>
)}


{quiz && user?.role === "student" && (
  <button
    onClick={() => navigate(`/courses/${courseId}/quiz`)}
    className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg mt-6"
  >
    Take Quiz
  </button>
)}


                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;