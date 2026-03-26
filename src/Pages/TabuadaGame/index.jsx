import React, { useState, useEffect, useContext } from "react";
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
  const [pointsPerCorrect, setPointsPerCorrect] = useState(5);
  const [thermometer, setThermometer] = useState(0);
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [lastResponseTime, setLastResponseTime] = useState(Date.now());
  const tabuNumber = parseInt(useParams().tabuada);
  const {
    getLocalStorageValue,
    setLocalStorageValue,
    rewardAnswer,
    rewardMilestone,
  } = useContext(AppContext);
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
    const pointsMapping = {
      0: 5,
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 0.1,
    };

    setPointsPerCorrect(pointsMapping[stars] || 5);
  }, [stars]);

  function increaseThermometer() {
    let newThermometer = thermometer + pointsPerCorrect;

    if (newThermometer >= 100) {
      newThermometer = 100;

      if (stars !== 5) {
        setLocalStorageValue(`stars_${tabuNumber}`, stars + 1);

        const milestoneResult = rewardMilestone({
          mode: "multiplication_star",
          xp: 80 + tabuNumber * 4,
          coins: 10 + stars,
          stars: 1,
          games: 1,
          label: "Estrela conquistada",
        });

        setFeedbackMessage(milestoneResult.message || "Estrela conquistada");
        navigateTo("/tabuadalevels");
      }
    }

    setThermometer(newThermometer);
  }

  function decreaseThermometer() {
    let newThermometer = thermometer;

    if (newThermometer !== 100) {
      newThermometer -= pointsPerCorrect;
    }

    if (newThermometer < 0) {
      newThermometer = 0;
    }

    setThermometer(newThermometer);
  }

  function decreaseThermometerBasedOnTime(elapsedTime) {
    const decreaseAmount = Math.floor((elapsedTime / 1000) * 1);
    const newThermometer = thermometer - decreaseAmount;

    if (newThermometer < 0) {
      setThermometer(0);
    } else if (thermometer !== 100) {
      setThermometer(newThermometer);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - lastResponseTime;

      if (elapsedTime >= 2000) {
        decreaseThermometerBasedOnTime(elapsedTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastResponseTime, thermometer]);

  useEffect(() => {
    generateEquation();
  }, [tabuNumber]);

  const generateEquation = () => {
    const num1 = tabuNumber;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    setEquation(`${num1} x ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
  };

  const toggleSounds = (correct) => {
    setPlayCorrectSound(correct);
    setPlayWrongSound(!correct);
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(response) === correctAnswer;
    const rewardResult = rewardAnswer(
      isCorrect
        ? {
            mode: "multiplication",
            isCorrect: true,
            baseXp: 8 + Math.ceil(pointsPerCorrect),
            baseCoins: 2,
          }
        : {
            mode: "multiplication",
            isCorrect: false,
            wrongPenaltyXp: 2,
            wrongPenaltyCoins: 0,
          }
    );

    setFeedbackState(isCorrect ? "correct" : "wrong");
    setFeedbackTick((prevTick) => prevTick + 1);
    setFeedbackMessage(
      rewardResult.message || (isCorrect ? "Boa resposta" : "Tente outra vez")
    );
    toggleSounds(isCorrect);

    if (isCorrect) {
      generateEquation();
      increaseThermometer();
      setLastResponseTime(Date.now());
    } else {
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      decreaseThermometer();
      setLastResponseTime(Date.now());
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
    />
  );
}
