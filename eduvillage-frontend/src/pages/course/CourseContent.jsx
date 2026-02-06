import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  createLesson,
  getCourseContent,
} from "../../api/contentApi";
import { completeLesson } from "../../api/courseApi";

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

  // ✅ FETCH CONTENT
  useEffect(() => {
    if (!courseId) return;

    const fetchContent = async () => {
      try {
        const res = await getCourseContent(courseId);
        setSections(res.data);
      } catch (err) {
        console.error("Failed to load course content", err);
      }
    };

    fetchContent();
  }, [courseId]);

  // ✅ ADD LESSON (Teacher)
  const handleAddLesson = async () => {
    if (!lessonTitle || !lessonContent || !activeSection) return;

    await createLesson({
      title: lessonTitle,
      content: lessonContent,
      imageUrl: lessonImage,
      sectionId: activeSection,
    });

    setLessonTitle("");
    setLessonContent("");
    setLessonImage("");
    setActiveSection(null);

    const res = await getCourseContent(courseId);
    setSections(res.data);
  };

  // ✅ COMPLETE LESSON (Student)
  const handleCompleteLesson = async (lessonId) => {
    try {
      await completeLesson(lessonId);
      setCompletedLessons((prev) => [...prev, lessonId]);
    } catch {
      console.error("Lesson completion failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-[#142C52]">
        Course Content
      </h1>

      {/* TEACHER – ADD SECTION */}
      {user?.role === "teacher" && courseId && (
        <button
          type="button"
          onClick={() =>
            navigate(`/courses/${courseId}/add-section`)
          }
          className="bg-[#142C52] text-white px-4 py-2 rounded mb-6"
        >
          + Add Section
        </button>
      )}

      {/* SECTIONS */}
      {sections.map((section) => (
        <div
          key={section._id}
          className="mb-8 border rounded-lg p-5 bg-white shadow"
        >
          <h2 className="text-lg font-semibold mb-4">
            {section.title}
          </h2>

          {/* LESSONS */}
          {section.lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(
              lesson._id
            );

            return (
              <div
                key={lesson._id}
                className="mb-5 pl-4 border-l"
              >
                <h3 className="font-medium text-md mb-1 flex items-center justify-between">
                  {lesson.title}

                  {user?.role === "student" && (
                    <button
                      onClick={() =>
                        handleCompleteLesson(lesson._id)
                      }
                      disabled={isCompleted}
                      className={`text-xs px-3 py-1 rounded ${
                        isCompleted
                          ? "bg-green-500 text-white cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : "Mark Complete"}
                    </button>
                  )}
                </h3>

                <p className="text-sm text-gray-700 mb-2">
                  {lesson.content}
                </p>

                {lesson.imageUrl && (
                  <img
                    src={lesson.imageUrl}
                    alt="Lesson"
                    className="max-w-full rounded border"
                  />
                )}
              </div>
            );
          })}

          {/* TEACHER – ADD LESSON */}
          {user?.role === "teacher" && (
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <input
                className="border px-3 py-2 mb-2 w-full rounded"
                placeholder="Lesson title"
                value={
                  activeSection === section._id
                    ? lessonTitle
                    : ""
                }
                onChange={(e) => {
                  setActiveSection(section._id);
                  setLessonTitle(e.target.value);
                }}
              />

              <textarea
                className="border px-3 py-2 mb-2 w-full rounded"
                placeholder="Lesson content"
                value={
                  activeSection === section._id
                    ? lessonContent
                    : ""
                }
                onChange={(e) =>
                  setLessonContent(e.target.value)
                }
              />

              <input
                className="border px-3 py-2 mb-3 w-full rounded"
                placeholder="Image URL (optional)"
                value={
                  activeSection === section._id
                    ? lessonImage
                    : ""
                }
                onChange={(e) =>
                  setLessonImage(e.target.value)
                }
              />

              <button
                onClick={handleAddLesson}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Lesson
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
