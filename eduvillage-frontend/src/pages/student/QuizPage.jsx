import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizByCourse, submitQuiz } from "../../api/courseApi";
import toast from "react-hot-toast";

const QuizPage = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuizByCourse(courseId)
      .then(res => {
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(null));
      })
      .catch(() => {
        toast.error("No quiz found for this course");
      });
  }, [courseId]);

  const handleAnswer = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz({
        quizId: quiz._id,
        answers,
      });

      toast.success(`Score: ${res.data.score}/${res.data.total}`);
    } catch {
      toast.error("Failed to submit quiz");
    }
  };

  if (!quiz) return <p className="p-8">Loading quiz...</p>;

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-8">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-4">
            {qIndex + 1}. {q.question}
          </h2>

          {q.options.map((opt, optIndex) => (
            <button
              key={optIndex}
              onClick={() => handleAnswer(qIndex, optIndex)}
              className={`block w-full text-left p-3 rounded-lg mb-2 ${
                answers[qIndex] === optIndex
                  ? "bg-[#1B9AAA] text-white"
                  : "bg-gray-100"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-[#1B9AAA] text-white px-6 py-3 rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
