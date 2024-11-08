import React, { useState, useEffect, useContext } from "react";
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

  // O operador ?? verifica se o valor à esquerda é null ou undefined e, se for o caso, usa o valor à direita como padrão.
  const [recordGamePoints, setRecordGamepoints] = useState(
    recordGameRandomTabuPtsFromStorage ?? 0
  );
  const [currentGamepoints, setCurrentGamepoints] = useState(0);

  const savedPoints = Number(getLocalStorageValue("totalPoints"));
  const [totalPoints, setTotalPoints] = useState(savedPoints);

  useEffect(() => {
    if (recordGamePoints < currentGamepoints) {
      setRecordGamepoints(currentGamepoints);
      setLocalStorageValue("randomTabuRecord", currentGamepoints);
    }
  }, [currentGamepoints]);

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

  // const updatePoints = (isCorrect) => {
  //   const pointsChange = isCorrect ? 1 : -1;

  //   setTotalPoints(totalPoints + pointsChange);
  //   setCurrentGamepoints(currentGamepoints + pointsChange);
  // };
  const updatePoints = (isCorrect) => {
    const pointsChange = isCorrect ? 1 : -1;

    // Impede que currentGamepoints e totalPoints sejam menores que zero
    if (
      totalPoints + pointsChange >= 0 &&
      currentGamepoints + pointsChange >= 0
    ) {
      setTotalPoints(totalPoints + pointsChange);
      setCurrentGamepoints(currentGamepoints + pointsChange);
    }
  };

  const checkAnswer = () => {
    // Se correto retorna true se errado retorna false
    const isCorrect = parseInt(response) === correctAnswer;

    toggleSounds(isCorrect);
    if (totalPoints > 0 || currentGamepoints > 0) {
      updatePoints(isCorrect);
    }

    if (isCorrect) {
      generateEquation();
    } else {
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
    />
  );
}
