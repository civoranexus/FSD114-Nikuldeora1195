import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createQuiz } from "../../api/courseApi";
import toast from "react-hot-toast";

const CreateQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async () => {
    if (!title || !question || options.some(opt => !opt)) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createQuiz({
        courseId,
        title,
        questions: [
          {
            question,
            options,
            correctAnswer,
          },
        ],
      });

      toast.success("Quiz created successfully 🎉");
      navigate("/teacher/courses");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <h1 className="text-3xl font-bold text-[#142C52] mb-6">
        Create Quiz
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-xl">

        {/* Quiz Title */}
        <input
          type="text"
          placeholder="Enter Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* Question */}
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {/* Options */}
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        ))}

        {/* Correct Answer */}
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          className="w-full border p-3 rounded-lg"
        >
          <option value={0}>Correct Answer: Option 1</option>
          <option value={1}>Correct Answer: Option 2</option>
          <option value={2}>Correct Answer: Option 3</option>
          <option value={3}>Correct Answer: Option 4</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#1B9AAA] text-white py-3 rounded-lg font-semibold hover:bg-[#16808D] transition"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
