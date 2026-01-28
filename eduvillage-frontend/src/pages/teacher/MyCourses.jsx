import { useEffect, useState } from "react";
import TeacherLayout from "../../components/app/TeacherLayout";
import { Link } from "react-router-dom";
import {
  getMyCourses,
  publishCourse,
} from "../../api/teacherCourseApi";

import toast from "react-hot-toast";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = () => {
    getMyCourses()
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.error("Failed to load courses");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCourses();
  }, []);

const handlePublish = async (id) => {
  const t = toast.loading("Publishing...");
  try {
    await publishCourse(id);
    toast.success("Course published", { id: t });
    loadCourses();
  } catch {
    toast.error("Publish failed", { id: t });
  }
};






  return (
    <TeacherLayout title="Teacher Dashboard">
      <div className="max-w-4xl mx-auto">

        {/* Teacher action bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#142C52]">
            My Courses
          </h2>

          <Link
            to="/teacher/courses/create"
            className="bg-[#142C52] text-white px-4 py-2 rounded text-sm"
          >
            + Create Course
          </Link>
        </div>

        {loading && (
          <p className="text-sm text-gray-600">
            Loading courses...
          </p>
        )}

        {!loading && courses.length === 0 && (
          <div className="bg-white rounded-lg p-6 shadow">
            <p>You have not created any courses yet.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl p-6 shadow"
            >
              <h4 className="text-lg font-medium mb-2">
                {course.title}
              </h4>

              <p className="text-sm mb-3 text-gray-600">
                {course.description}
              </p>

              <p className="text-sm mb-3">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    course.isPublished
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </span>
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to={`/teacher/courses/${course._id}/edit`}
                  className="text-sm text-blue-600 underline"
                >
                  Edit
                </Link>

                {!course.isPublished && (
                  <button
                    onClick={() => handlePublish(course._id)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default MyCourses;
