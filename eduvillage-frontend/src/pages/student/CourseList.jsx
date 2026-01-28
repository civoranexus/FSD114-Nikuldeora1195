import { useEffect, useState } from "react";
import { getPublishedCourses, enrollCourse } from "../../api/courseApi";
import StudentLayout from "../../components/app/StudentLayout";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublishedCourses()
      .then((res) => setCourses(res.data))
      .catch(() => setError("Failed to load courses"));
  }, []);

  const handleEnroll = async (id) => {
    try {
      await enrollCourse(id);
      alert("Enrolled successfully");
    } catch {
      alert("Already enrolled or error occurred");
    }
  };

  return (
    <StudentLayout title="Courses">
    <div>
      <h2>Available Courses</h2>
      {error && <p>{error}</p>}

      {courses.map((course) => (
        <div key={course._id}>
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <button onClick={() => handleEnroll(course._id)}>
            Enroll
          </button>
        </div>
      ))}
    </div>
    </StudentLayout>
  );
};

export default CourseList;
