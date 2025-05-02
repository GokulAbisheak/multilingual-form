import { useState } from "react";

const QuizBox = ({ quiz }) => {
    const [selectedSingle, setSelectedSingle] = useState(null);
    const [selectedMulti, setSelectedMulti] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const handleSingleChange = (value) => {
        setSelectedSingle(value);
    };

    const handleMultiChange = (value) => {
        if (selectedMulti.includes(value)) {
            setSelectedMulti(selectedMulti.filter(item => item !== value));
        } else {
            setSelectedMulti([...selectedMulti, value]);
        }
    };

    const nextQuestion = ( ) => {
        setQuestionIndex(questionIndex + 1);
    }

    const prevQuestion = ( ) => {
        setQuestionIndex(questionIndex - 1);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-[800px] w-full p-10 border border-gray-300 rounded">
                <h2 className="text-xl font-bold mb-5">{quiz && quiz[questionIndex]?.question} <span className="text-sm font-medium italic">{quiz && quiz[questionIndex]?.type == "multi" ? "(Multiple Answers)" : "(Single Answer)"}</span></h2>
                <div className="flex flex-col gap-3">
                    {quiz && quiz[questionIndex]?.type === "single" && quiz && quiz[questionIndex]?.answers?.map((answer, index) => (
                        <div key={index} className="flex">
                            <input
                                type="radio"
                                id={`answer-${index}`}
                                name="quiz-answer"
                                value={answer}
                                className="mr-2 mt-1.5 w-5 h-5"
                                onChange={( ) => handleSingleChange(answer)}
                                checked={selectedSingle === answer}
                                hidden
                            />
                            <label
                                htmlFor={`answer-${index}`}
                                className={`text-lg w-full p-2 rounded cursor-pointer ${selectedSingle === answer ? "bg-green-100" : "bg-neutral-100"}`}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                    {quiz && quiz[questionIndex]?.type === "multi" && quiz && quiz[questionIndex]?.answers?.map((answer, index) => (
                        <div key={index} className="flex">
                            <input
                                type="checkbox"
                                id={`answer-${index}`}
                                name="quiz-answer"
                                value={answer}
                                className="mr-2 mt-1.5 w-5 h-5"
                                onChange={( ) => handleMultiChange(answer)}
                                checked={selectedMulti.includes(answer)}
                                hidden
                            />
                            <label
                                htmlFor={`answer-${index}`}
                                className={`text-lg w-full p-2 rounded cursor-pointer ${selectedMulti.includes(answer) ? "bg-green-100" : "bg-neutral-100"}`}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-5">
                    <button onClick={( ) => { prevQuestion( ) }} disabled={questionIndex === 0} className="bg-sky-500 hover:bg-sky-600 duration-300 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-200 disabled:text-gray-500">Previous</button>
                    <button onClick={( ) => { nextQuestion( ) }} disabled={questionIndex === quiz.length - 1} className="bg-sky-500 hover:bg-sky-600 duration-300 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-200 disabled:text-gray-500">Next</button>
                </div>
            </div>
        </div>
    );
};

export default QuizBox;
