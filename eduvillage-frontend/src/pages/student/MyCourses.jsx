import { useEffect, useState } from "react";
import {
  getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";
import usePageTitle from "../../utils/usePageTitle";

const MyCourses = () => {
  usePageTitle("My Courses | EduVillage");

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      const res = await getMyEnrollments();
      setCourses(res.data);
    } catch (err) {
      setError("Failed to load enrolled courses");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleProgressChange = async (enrollId, value) => {
    const progress = Number(value);
    if (progress < 0 || progress > 100) return;

    try {
      await updateProgress(enrollId, progress);
      loadCourses(); // refresh after update
    } catch (err) {
      console.error("Progress update failed");
    }
  };

  return (
    <div>
      <h2>My Enrolled Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {courses.length === 0 && (
        <p>You have not enrolled in any courses yet.</p>
      )}

      {courses.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{item.course?.title}</h4>

          <p>Progress: {item.progress}%</p>

          <input
            type="number"
            min="0"
            max="100"
            value={item.progress}
            onChange={(e) =>
              handleProgressChange(item._id, e.target.value)
            }
          />

          {item.isCompleted && (
            <p style={{ color: "green", marginTop: "8px" }}>
              ✅ Course Completed
            </p>
          )}

          {item.isCompleted && (
            <p>🎓 Certificate Eligible (Simulated)</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
