import { useEffect, useState } from "react";
import {
  getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";
import usePageTitle from "../../utils/usePageTitle";
import Card from "../../components/ui/Card";

const MyCourses = () => {
  usePageTitle("My Courses | EduVillage");

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      const res = await getMyEnrollments();
      setCourses(res.data);
    } catch {
      setError("Failed to load enrolled courses");
    }
  };

 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await getMyEnrollments();
      setCourses(res.data);
    } catch {
      setError("Failed to load enrolled courses");
    }
  };

  fetchCourses();
}, []);


  const handleProgressChange = async (id, value) => {
    const progress = Number(value);
    if (progress < 0 || progress > 100) return;

    try {
      await updateProgress(id, progress);
      loadCourses();
    } catch {
      console.error("Progress update failed");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>My Enrolled Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {courses.length === 0 && (
        <p>You have not enrolled in any courses yet.</p>
      )}

      {courses.map((item) => (
        <Card key={item._id} title={item.course?.title}>
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
              ✅ Completed · 🎓 Certificate Eligible
            </p>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MyCourses;
