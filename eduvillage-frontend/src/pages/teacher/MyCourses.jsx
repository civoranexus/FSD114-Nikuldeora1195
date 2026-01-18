import { useEffect, useState } from "react";
import {
  getMyEnrollments,
  updateProgress,
} from "../../api/courseApi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = () => {
    getMyEnrollments().then((res) => {
      setCourses(res.data);
    });
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleProgress = async (id, value) => {
  if (value < 0 || value > 100) return;

  try {
    await updateProgress(id, Number(value));
    loadCourses();
  } catch(err) {
    console.error("Progress update failed");
  }
};

  return (
    <div>
      <h2>My Enrolled Courses</h2>

      {courses.map((item) => (
        <div key={item._id}>
          <h4>{item.course.title}</h4>
          <p>Progress: {item.progress}%</p>

          <input
            type="number"
            min="0"
            max="100"
            value={item.progress}
            onChange={(e) =>
              handleProgress(item._id, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
