import "./style.scss";
import img1 from "../../assets/img/congratulation.png";
import img2 from "../../assets/img/cracker.png";
import img3 from "../../assets/img/anxiety.png";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

const Result = ({ score, setScore, timeStart, setTimeStart }) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const handlePlayAgain = () => {
    setScore(0);
    setTimeStart(Date.now());
    navigate("/quiz");
  };

  useEffect(() => {
    const unixTime = Date.now() - timeStart;

    const time = new Date(unixTime);

    setSeconds(
      time.toLocaleTimeString("en-US", {
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);
  const handleQuitGame = () => {
    setScore(0);
    navigate("/");
  };

  return (
    <div>
      <div className="result">
        <div className="result-toggle">
          <VscChromeClose
            className="result-toggle-button"
            onClick={() => handleQuitGame()}
          />
        </div>
        <img src={score < 2 ? img3 : score < 5 ? img2 : img1} alt="" />
        <h3>
          {score < 2
            ? "Don't worry"
            : score < 5
            ? "Completed"
            : "Congratulations!!"}
        </h3>
        <p>
          {score < 2
            ? "Let's try again"
            : score < 5
            ? "Better luck next time!"
            : "You are amazing!!"}
        </p>
        <p>
          {score}/10 correct answers in {seconds}
        </p>
        <button onClick={handlePlayAgain}>Play Again</button>
      </div>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func,
  timeStart: PropTypes.number,
  setTimeStart: PropTypes.func,
};
export default Result;
