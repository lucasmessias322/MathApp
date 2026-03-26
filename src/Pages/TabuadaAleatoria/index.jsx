import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../../components/MathLayout";
import { AppContext } from "../../Contexts/AppContext";

export default function TabuadaAleatoria() {
  const {
    getLocalStorageValue,
    setLocalStorageValue,
    rewardAnswer,
    rewardMilestone,
  } = useContext(AppContext);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const recordGameRandomTabuPtsFromStorage =
    Number(getLocalStorageValue("randomTabuRecord")) || 0;
  const [recordGamePoints, setRecordGamepoints] = useState(
    recordGameRandomTabuPtsFromStorage
  );
  const [currentGamepoints, setCurrentGamepoints] = useState(0);

  useEffect(() => {
    if (recordGamePoints < currentGamepoints) {
      setRecordGamepoints(currentGamepoints);
      setLocalStorageValue("randomTabuRecord", currentGamepoints);
    }
  }, [currentGamepoints]);

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
    generateEquation();
  }, []);

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
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

  const updatePoints = (isCorrect) => {
    const pointsChange = isCorrect ? 1 : -1;

    if (currentGamepoints + pointsChange >= 0) {
      setCurrentGamepoints(currentGamepoints + pointsChange);
    }
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(response) === correctAnswer;
    const rewardResult = rewardAnswer(
      isCorrect
        ? {
            mode: "random_multiplication",
            isCorrect: true,
            baseXp: 12,
            baseCoins: 3,
          }
        : {
            mode: "random_multiplication",
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
    updatePoints(isCorrect);

    if (isCorrect) {
      const nextPoints = currentGamepoints + 1;

      if (nextPoints > recordGamePoints) {
        const milestoneResult = rewardMilestone({
          mode: "random_record",
          xp: 24,
          coins: 6,
          games: 1,
          label: "Novo recorde",
        });
        setFeedbackMessage(milestoneResult.message || "Novo recorde");
      }

      generateEquation();
    } else {
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);
    }
  };

  return (
    <MathLayout
      recordGamePoints={recordGamePoints}
      currentGamepoints={currentGamepoints}
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
