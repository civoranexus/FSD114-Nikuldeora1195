import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import StudentLayout from "../../components/app/StudentLayout";
import TeacherLayout from "../../components/app/TeacherLayout";
import Card from "../../components/ui/Card";

import toast from "react-hot-toast";

import { getCourseById } from "../../api/courseDetailApi";
import {
  enrollInCourse,
  getMyEnrollments,
} from "../../api/enrollmentApi";
import { getCourseStudents } from "../../api/courseStudentsApi";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const courseRes = await getCourseById(id);
        setCourse(courseRes.data);

        if (user?.role === "student") {
          const enrollRes = await getMyEnrollments();
          const alreadyEnrolled = enrollRes.data.some(
            (e) => e.course?._id === id
          );
          setEnrolled(alreadyEnrolled);
        }

        if (user?.role === "teacher") {
          const studentRes = await getCourseStudents(id);
          setStudents(studentRes.data);
        }
      } catch (err) {
        console.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setMessage("");
    const t = toast.loading("Enrolling...");
try {
  await enrollInCourse(id);
  toast.success("Enrolled successfully", { id: t });
  setEnrolled(true);
} catch {
  toast.error("Already enrolled", { id: t });
}


    try {
      await enrollInCourse(id);
      setEnrolled(true);
      setMessage("✅ Successfully enrolled!");
    } catch {
      setMessage("⚠️ Enrollment failed or already enrolled");
    } finally {
      setEnrolling(false);
    }
  };

  const Layout =
    user?.role === "teacher" ? TeacherLayout : StudentLayout;

  return (
    <Layout title="Course Details">
      {loading && <p>Loading course...</p>}

      {!loading && course && (
        <div className="max-w-3xl space-y-6">
          <Card title={course.title}>
            <p className="mb-4">{course.description}</p>
            <p className="text-sm text-gray-600">
              Instructor: {course.createdBy?.email}
            </p>
          </Card>

          {/* STUDENT VIEW */}
          {user?.role === "student" && (
            <Card title="Your Learning">
              {!enrolled ? (
                <>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="bg-[#142C52] text-white px-6 py-2 rounded-md"
                  >
                    {enrolling
                      ? "Enrolling..."
                      : "Enroll in Course"}
                  </button>
                  {message && (
                    <p className="mt-3 text-sm">{message}</p>
                  )}
                </>
              ) : (
                <>
                  <p className="mb-3 text-green-600 font-medium">
                    ✔ You are enrolled
                  </p>
                  <button
                    onClick={() => navigate("/my-courses")}
                    className="bg-[#5B74A3] text-white px-6 py-2 rounded-md"
                  >
                    Continue Learning
                  </button>
                </>
              )}
            </Card>
          )}

          {/* TEACHER VIEW */}
          {user?.role === "teacher" && (
            <Card title="Enrolled Students">
              {students.length === 0 ? (
                <p>No students enrolled yet.</p>
              ) : (
                <ul className="space-y-2">
                  {students.map((s) => (
                    <li
                      key={s._id}
                      className="border-b pb-2"
                    >
                      <p className="font-medium">
                        {s.student?.name || "Student"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {s.student?.email}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>
      )}
    </Layout>
  );
};

export default CourseDetail;
