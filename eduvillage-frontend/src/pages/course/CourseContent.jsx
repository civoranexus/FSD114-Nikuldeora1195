import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  createSection,
  createLesson,
  getCourseContent,
} from "../../api/contentApi";

const CourseContent = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);

  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [activeSection, setActiveSection] = useState(null);

 
useEffect(() => {
  let isMounted = true;

  const fetchContent = async () => {
    try {
      const res = await getCourseContent(courseId);
      if (isMounted) {
        setSections(res.data);
      }
    } catch (error) {
      console.error("Failed to load course content");
    }
  };

  fetchContent();

  return () => {
    isMounted = false;
  };
}, [courseId]);

  const handleAddSection = async () => {
    if (!sectionTitle) return;
    await createSection({
      title: sectionTitle,
      courseId,
    });
    setSectionTitle("");
    
  };

  const handleAddLesson = async () => {
    if (!lessonTitle || !lessonContent || !activeSection) return;

    await createLesson({
      title: lessonTitle,
      content: lessonContent,
      sectionId: activeSection,
    });

    setLessonTitle("");
    setLessonContent("");
    setActiveSection(null);

  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">
        Course Content
      </h1>

      {/* Teacher – Add Section */}
      {user?.role === "teacher" && (
        <div className="mb-6">
          <input
            className="border px-3 py-2 mr-2"
            placeholder="New section title"
            value={sectionTitle}
            onChange={(e) =>
              setSectionTitle(e.target.value)
            }
          />
          <button
            onClick={handleAddSection}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Section
          </button>
        </div>
      )}

      {/* Sections & Lessons */}
      {sections.map((section) => (
        <div
          key={section._id}
          className="mb-6 border rounded p-4"
        >
          <h2 className="text-lg font-semibold mb-2">
            {section.title}
          </h2>

          {/* Lessons */}
          {section.lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="ml-4 mb-2"
            >
              <h3 className="font-medium">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-700">
                {lesson.content}
              </p>
            </div>
          ))}

          {/* Teacher – Add Lesson */}
          {user?.role === "teacher" && (
            <div className="mt-4">
              <input
                className="border px-3 py-1 mr-2"
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
                className="border px-3 py-1 mr-2 mt-2 block w-full"
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

              <button
                onClick={handleAddLesson}
                className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
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
