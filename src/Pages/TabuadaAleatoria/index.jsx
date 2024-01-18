import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import MathLayout from "../../components/MathLayout";
import { AppContext } from "../../Contexts/AppContext";

export default function TabuadaAleatoria() {
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const recordGameRandomTabuPtsFromStorage =
    getLocalStorageValue("randomTabuRecord");

  const [recordGamePoints, setRecordGamepoints] = useState(
    recordGameRandomTabuPtsFromStorage ? recordGameRandomTabuPtsFromStorage : 0
  );
  const [currentGamepoints, setCurrentgamepoints] = useState(0);

  const savedPoints = Number(getLocalStorageValue("totalPoints"));
  const [totalPoints, setTotalPoints] = useState(savedPoints);

  useEffect(() => {
    if (recordGamePoints < currentGamepoints) {
      setRecordGamepoints(currentGamepoints);
      setLocalStorageValue("randomTabuRecord", currentGamepoints);
    }
  }, [currentGamepoints]);

  const handleButtonClicked = (value) => {
    if (value === "C") {
      setResponse("");
    } else if (value === "=") {
      checkAnswer();
    } else if (value === "🔊") {
      setIsSoundEnabled(!isSoundEnabled);
    } else {
      setResponse(response + value);
    }
  };

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
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
  };

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateEquation();
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setTotalPoints(totalPoints + 1);

      setCurrentgamepoints(currentGamepoints + 1);
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (totalPoints > 0) {
        setTotalPoints(totalPoints - 1);
      }

      if (currentGamepoints > 0) {
        setCurrentgamepoints(currentGamepoints - 1);
      }

      // Mostra a resposta correta  por meio segundo
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
      thermometer={false}
      equation={equation}
      response={response}
      handleButtonClicked={handleButtonClicked}
      playCorrectSound={playCorrectSound}
      isSoundEnabled={isSoundEnabled}
      playWrongSound={playWrongSound}
      setPlayCorrectSound={setPlayCorrectSound}
      setPlayWrongSound={setPlayWrongSound}
    />
  );
}
