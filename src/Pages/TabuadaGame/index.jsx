import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MathLayout from "../../components/MathLayout";
import { AppContext } from "../../Contexts/AppContext";

export default function TabuadaGame() {
  const navigateTo = useNavigate();
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [progressPerCorrect, setProgressPerCorrect] = useState(5);
  const [thermometer, setThermometer] = useState(0);
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const lastResponseTimeRef = useRef(Date.now());
  const tabuNumber = parseInt(useParams().tabuada);
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const stars = Number(getLocalStorageValue(`stars_${tabuNumber}`)) || 0;

  useEffect(() => {
    if (feedbackState === "idle") {
      return undefined;
    }

    const timer = setTimeout(() => {
      setFeedbackState("idle");
    }, 650);

    return () => clearTimeout(timer);
  }, [feedbackState, feedbackTick]);

  useEffect(() => {
    const progressMapping = {
      0: 5,
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 0.1,
    };

    setProgressPerCorrect(progressMapping[stars] || 5);
  }, [stars]);

  function increaseThermometer() {
    let newThermometer = thermometer + progressPerCorrect;

    if (newThermometer >= 100) {
      newThermometer = 100;

      if (stars !== 5) {
        setLocalStorageValue(`stars_${tabuNumber}`, stars + 1);

        setFeedbackMessage("Estrela conquistada");
        navigateTo("/tabuadalevels");
      }
    }

    setThermometer(newThermometer);
  }

  function decreaseThermometer() {
    let newThermometer = thermometer;

    if (newThermometer !== 100) {
      newThermometer -= progressPerCorrect;
    }

    if (newThermometer < 0) {
      newThermometer = 0;
    }

    setThermometer(newThermometer);
  }

  const decreaseThermometerBasedOnTime = useCallback((elapsedTime) => {
    const decreaseAmount = Math.floor((elapsedTime / 1000) * 1);

    setThermometer((currentThermometer) => {
      if (currentThermometer === 100) {
        return currentThermometer;
      }

      return Math.max(0, currentThermometer - decreaseAmount);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - lastResponseTimeRef.current;

      if (elapsedTime >= 2000) {
        decreaseThermometerBasedOnTime(elapsedTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [decreaseThermometerBasedOnTime]);

  const generateEquation = useCallback(() => {
    const num1 = tabuNumber;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    setEquation(`${num1} x ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
  }, [tabuNumber]);

  useEffect(() => {
    generateEquation();
  }, [generateEquation]);

  const toggleSounds = (correct) => {
    setPlayCorrectSound(correct);
    setPlayWrongSound(!correct);
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(response) === correctAnswer;

    setFeedbackState(isCorrect ? "correct" : "wrong");
    setFeedbackTick((prevTick) => prevTick + 1);
    setFeedbackMessage(isCorrect ? "Boa resposta" : "Tente outra vez");
    toggleSounds(isCorrect);

    if (isCorrect) {
      generateEquation();
      increaseThermometer();
      lastResponseTimeRef.current = Date.now();
    } else {
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      decreaseThermometer();
      lastResponseTimeRef.current = Date.now();
    }
  };

  return (
    <MathLayout
      thermometer={thermometer}
      equation={equation}
      response={response}
      playCorrectSound={playCorrectSound}
      isSoundEnabled={isSoundEnabled}
      playWrongSound={playWrongSound}
      setPlayCorrectSound={setPlayCorrectSound}
      setPlayWrongSound={setPlayWrongSound}
      setResponse={setResponse}
      setIsSoundEnabled={setIsSoundEnabled}
      checkAnswer={checkAnswer}
      feedbackState={feedbackState}
      feedbackTick={feedbackTick}
      feedbackMessage={feedbackMessage}
      disableMotion
    />
  );
}
