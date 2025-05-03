import React from "react";

const QuizBar = ({ length, questionIndex, setQuestionIndex, answers }) => {
  return (
    <div className="w-full p-5 border border-gray-300 rounded">
      <div className="text-lg font-bold mb-5">Questions</div>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length }).map((_, i) => {
          const isSelected = i === questionIndex;
          const isAnswered =
            answers[i]?.value && answers[i]?.value.length !== 0;

          let bgColor = "bg-gray-100";
          let borderColor = "border-gray-300";

          if (isSelected) {
            bgColor = "bg-sky-100";
            borderColor = "border-sky-600";
          } else if (isAnswered) {
            bgColor = "bg-green-100";
            borderColor = "border-green-600";
          }

          return (
            <button
              key={i}
              onClick={() => setQuestionIndex(i)}
              className={`h-10 w-10 rounded border-1 flex justify-center items-center cursor-pointer ${bgColor} ${borderColor}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizBar;
