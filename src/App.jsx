import { useState, useEffect } from "react"
import QuizBox from "./components/QuizBox"
import QuizDataEN from "./data/quiz-data-en.json"
import QuizDataSI from "./data/quiz-data-si.json"
import QuizDataTA from "./data/quiz-data-ta.json"

function App() {

  const [language, setLanguage] = useState('en')
  const [data, setData] = useState(QuizDataEN);

  useEffect(() => {
    if (language === 'en') {
      setData(QuizDataEN)
    } else if (language === 'si') {
      setData(QuizDataSI)
    } else if (language === 'ta') {
      setData(QuizDataTA)
    }
  }, [language])
  

  return (
    <>
    <select onChange={(e) => { setLanguage(e.target.value) }}>
      <option value="en">English</option>
      <option value="si">Sinhala</option>
      <option value="ta">Tamil</option>
    </select>
     <QuizBox quiz={data} />
    </>
  )
}

export default App
