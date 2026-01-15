import { useEffect, useState } from "react";
import { getTeacherCourses } from "../../api/courseApi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTeacherCourses()
      .then((res) => setCourses(res.data))
      .catch(() => setError("Failed to load your courses"));
  }, []);

  return (
    <div>
      <h2>My Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {courses.map((course) => (
        <div key={course._id}>
          <h4>{course.title}</h4>
          <p>Status: {course.isPublished ? "Published" : "Draft"}</p>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
