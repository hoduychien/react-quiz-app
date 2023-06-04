import { useEffect, useState } from "react";
import "./style.scss";
import useAsync from "../../hooks/useAsync";
import Loading from "../../components/loading/Loading";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineRadioButtonUnchecked,
  // MdOutlineRadioButtonChecked,
} from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";

import { decode } from "html-entities";

const Quiz = ({ score, setScore }) => {
  const { data } = useAsync("/api.php?amount=10&category=21");

  const [options, setOptions] = useState();

  const [selected, setSelected] = useState();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setOptions(
      data &&
        handleShuffle([
          data[currentQuestion].correct_answer,
          ...data[currentQuestion].incorrect_answers,
        ])
    );
  }, [currentQuestion, data]);

  const handleShuffle = (ops) => {
    return ops.sort(() => Math.random() - 0.5);
  };

  const handleSelectAnswer = (answers) => {
    if (
      selected === answers &&
      selected === data[currentQuestion]?.correct_answer
    ) {
      return "true";
    } else if (
      selected === answers &&
      selected !== data[currentQuestion]?.correct_answer
    ) {
      return "false";
    }
  };

  const handleCheck = (ops) => {
    setSelected(ops);
    if (ops === data[currentQuestion]?.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected();
    }
  };

  const handleQuitGame = () => {
    setScore(0);
    navigate("/");
  };
  return (
    <div className="quiz-wrapper">
      {!data ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="quiz-main">
          <div className="quiz-toggle">
            <VscChromeClose
              className="quiz-toggle-button"
              onClick={() => handleQuitGame()}
            />
          </div>
          <h3 className="quiz-title">
            Questions {currentQuestion + 1} <span>/ 10</span>
          </h3>

          <p className="quiz-question">
            {decode(data[currentQuestion]?.question)}
          </p>
          <div className="quiz-answers">
            {options &&
              options.map((ops) => (
                <button
                  className={`quiz-answers-item ${
                    selected && handleSelectAnswer(ops)
                  }`}
                  key={ops}
                  onClick={() => handleCheck(ops)}
                  disabled={selected}
                >
                  <p>{decode(ops)}</p>

                  <MdOutlineRadioButtonUnchecked
                    className={`quiz-answers-icon `}
                  />
                </button>
              ))}
          </div>
          <button
            className={
              selected ? "quiz-button" : "quiz-button quiz-button-disable"
            }
            onClick={() => handleNextQuestion()}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

Quiz.propTypes = {
  score: PropTypes.number,
  setScore: PropTypes.func,
};

export default Quiz;
