import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSection } from "../../api/contentApi";

const AddSection = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await createSection({
      title,
      courseId,
    });

    navigate(`/courses/${courseId}/content`);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Add New Section
      </h1>

      <input
        className="border px-4 py-2 w-full mb-4 rounded"
        placeholder="Section title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-[#142C52] text-white px-6 py-2 rounded"
      >
        Create Section
      </button>
    </div>
  );
};

export default AddSection;
