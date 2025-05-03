import { useEffect } from "react";

const QuizBox = ({
  quiz,
  selectedSingle,
  setSelectedSingle,
  selectedMulti,
  setSelectedMulti,
  questionIndex,
  setQuestionIndex,
  answers,
  setAnswers,
  handleSubmit
}) => {
  const handleSingleChange = (value) => {
    setSelectedSingle(value);
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: { type: "single", value },
    }));
  };

  const handleMultiChange = (value) => {
    let updated;
    if (selectedMulti.includes(value)) {
      updated = selectedMulti.filter((item) => item !== value);
    } else {
      updated = [...selectedMulti, value];
    }
    setSelectedMulti(updated);
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: { type: "multi", value: updated },
    }));
  };

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    console.log(answers);
  };

  const prevQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  useEffect(() => {
    const currentAnswer = answers[questionIndex];
    if (currentAnswer?.type === "single") {
      setSelectedSingle(currentAnswer.value);
      setSelectedMulti([]);
    } else if (currentAnswer?.type === "multi") {
      setSelectedMulti(currentAnswer.value);
      setSelectedSingle(null);
    } else {
      setSelectedSingle(null);
      setSelectedMulti([]);
    }
  }, [questionIndex, answers]);

  return (
    <div className="w-full p-5 lg:p-10 border border-gray-300 rounded">
      <h3 className="mb-4">Question No: {questionIndex + 1}</h3>
      <h2 className="text-xl font-bold mb-5">
        {quiz && quiz[questionIndex]?.question}{" "}
        <span className="text-sm font-medium italic">
          {quiz && quiz[questionIndex]?.type == "multi"
            ? "(Multiple Answers)"
            : "(Single Answer)"}
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        {quiz &&
          quiz[questionIndex]?.type === "single" &&
          quiz &&
          quiz[questionIndex]?.answers?.map((answer, index) => (
            <div key={index} className="flex">
              <input
                type="radio"
                id={`answer-${index}`}
                name="quiz-answer"
                value={answer}
                className="mr-2 mt-1.5 w-5 h-5"
                onChange={() => handleSingleChange(answer)}
                checked={selectedSingle === answer}
                hidden
              />
              <label
                htmlFor={`answer-${index}`}
                className={`text-lg w-full p-2 rounded cursor-pointer ${
                  selectedSingle === answer ? "bg-sky-100" : "bg-neutral-100"
                }`}
              >
                {answer}
              </label>
            </div>
          ))}
        {quiz &&
          quiz[questionIndex]?.type === "multi" &&
          quiz &&
          quiz[questionIndex]?.answers?.map((answer, index) => (
            <div key={index} className="flex">
              <input
                type="checkbox"
                id={`answer-${index}`}
                name="quiz-answer"
                value={answer}
                className="mr-2 mt-1.5 w-5 h-5"
                onChange={() => handleMultiChange(answer)}
                checked={selectedMulti.includes(answer)}
                hidden
              />
              <label
                htmlFor={`answer-${index}`}
                className={`text-lg w-full p-2 rounded cursor-pointer ${
                  selectedMulti.includes(answer)
                    ? "bg-sky-100"
                    : "bg-neutral-100"
                }`}
              >
                {answer}
              </label>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-5">
        <button
          onClick={() => {
            prevQuestion();
          }}
          disabled={questionIndex === 0}
          className="bg-sky-600 hover:bg-sky-700 duration-300 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-200 disabled:text-gray-500"
        >
          Previous
        </button>
        {questionIndex != quiz.length - 1 ? (
          <button
            onClick={() => {
              nextQuestion();
            }}
            disabled={questionIndex === quiz.length - 1}
            className="bg-sky-600 hover:bg-sky-700 duration-300 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-200 disabled:text-gray-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              handleSubmit();
            }}
            disabled={!(questionIndex === quiz.length - 1)}
            className="bg-green-600 hover:bg-green-700 duration-300 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-200 disabled:text-gray-500"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizBox;
