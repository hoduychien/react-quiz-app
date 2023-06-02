import "./style.scss";
import img from "../../assets/img/options.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Home = ({ setTimeStart }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setTimeStart(Date.now());
    navigate("/quiz");
  };
  return (
    <div className="home">
      <div className="home-image">
        <img src={img} alt="" />
      </div>
      <button className="home-button" onClick={handleStartQuiz}>
        Start Quiz!
      </button>
    </div>
  );
};

Home.propTypes = {
  setTimeStart: PropTypes.func,
};

export default Home;
