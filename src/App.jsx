import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";
import Home from "./pages/home/Home";
import { useState } from "react";
import Result from "./pages/result/Result";

const App = () => {
  const [score, setScore] = useState(0);
  const [timeStart, setTimeStart] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTimeStart={setTimeStart} />} />
        <Route
          path="/quiz"
          element={<Quiz score={score} setScore={setScore} />}
        />
        <Route
          path="/result"
          element={
            <Result
              score={score}
              setScore={setScore}
              timeStart={timeStart}
              setTimeStart={setTimeStart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
