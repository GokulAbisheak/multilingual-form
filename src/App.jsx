import { useState, useEffect } from "react";
import QuizBox from "./components/QuizBox";
import QuizDataEN from "./data/quiz-data-en.json";
import QuizDataSI from "./data/quiz-data-si.json";
import QuizDataTA from "./data/quiz-data-ta.json";
import QuizBar from "./components/QuizBar";
import Header from "./components/Header";

function App() {
  const [language, setLanguage] = useState("en");
  const [data, setData] = useState(QuizDataEN);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (language === "en") {
      setData(QuizDataEN);
    } else if (language === "si") {
      setData(QuizDataSI);
    } else if (language === "ta") {
      setData(QuizDataTA);
    }
  }, [language]);

  const handleSubmit = ( ) => {
    console.log(answers);
  }

  return (
    <>
    <Header setLanguage={setLanguage} />
      <div className="grid grid-cols-6 p-5 gap-5">
        <div className="col-span-6 lg:col-span-4 order-2 lg:order-1">
          <QuizBox
            quiz={data}
            selectedSingle={selectedSingle}
            setSelectedSingle={setSelectedSingle}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            answers={answers}
            setAnswers={setAnswers}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="col-span-6 lg:col-span-2 order-1 lg:order-2">
          <QuizBar
            length={data.length}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            answers={answers}
          />
        </div>
      </div>
    </>
  );
}

export default App;
