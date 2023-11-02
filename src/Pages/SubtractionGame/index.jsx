import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SubtractionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";
import AditAndSubtrComponents from "../../components/AditAndSubtrComponents";

export default function SubtractionGame() {
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);

  const CurrentPhase = useParams().phase;

  const generateSubtractionEquation = () => {
    let minRange;
    let maxRange;

    SubtractionphasesList.forEach((item, i) => {
      if (item.phase == CurrentPhase) {
        minRange = item.minRange;
        maxRange = item.maxRange;
      }
    });

    const num2 =
      Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const minNum1 = num2; // O primeiro número é igual ou maior que num2
    const maxNum1 = maxRange; // O primeiro número está dentro do intervalo
    const num1 = Math.floor(Math.random() * (maxNum1 - minNum1 + 1)) + minNum1;

    const result = num1 - num2;

    setEquation(`${num1} - ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
  };

  return (
    <AditAndSubtrComponents
      PhasesList={SubtractionphasesList}
      PhasesListName="subtractionphasesList"
      RedirectLevelsUrl="/subtractionlevels"
      generateEquation={generateSubtractionEquation}
      setResponse={setResponse}
      setPlayCorrectSound={setPlayCorrectSound}
      setPlayWrongSound={setPlayWrongSound}
      equation={equation}
      response={response}
      correctAnswer={correctAnswer}
      playCorrectSound={playCorrectSound}
      playWrongSound={playWrongSound}
      CurrentPhase={CurrentPhase}
    />
  );
}
