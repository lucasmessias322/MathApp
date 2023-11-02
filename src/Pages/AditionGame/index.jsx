import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AditionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";
import AditAndSubtrComponents from "../../components/AditAndSubtrComponents";

export default function AditionGame() {
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);

  const CurrentPhase = useParams().phase;

  const generateAditionEquation = () => {
    let minRange;
    let maxRange;

    AditionphasesList.forEach((item, i) => {
      if (item.phase == CurrentPhase) {
        minRange = item.minRange;
        maxRange = item.maxRange;
      }
    });

    const num1 =
      Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const num2 =
      Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    const result = num1 + num2;
    setEquation(`${num1} + ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
  };

  return (
    <AditAndSubtrComponents
      PhasesList={AditionphasesList}
      PhasesListName="aditionphasesList"
      RedirectLevelsUrl="/aditionlevels"
      generateEquation={generateAditionEquation}
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
