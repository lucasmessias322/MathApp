import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../MathLayout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

export default function AditAndSubtrComponents({
  PhasesList,
  PhasesListName,
  generateEquation,
  RedirectLevelsUrl,
  setResponse,
  setPlayCorrectSound,
  setPlayWrongSound,
  equation,
  response,
  correctAnswer,
  playCorrectSound,
  playWrongSound,
  CurrentPhase,
}) {
  const navigateTo = useNavigate();
  const { getLocalStorageValue, setLocalStorageValue, savedPoints } =
    useContext(AppContext);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(0);
  const [totalPoints, setTotalPoints] = useState(
    Number(getLocalStorageValue("totalPoints"))
  );
  const [phasesList, setPhasesList] = useState(PhasesList);

  const phasesListFromStorage = JSON.parse(
    getLocalStorageValue(PhasesListName)
  );

  useEffect(() => {
    if (!phasesListFromStorage) {
      setPhasesList(phasesList);
    } else {
      setPhasesList(phasesListFromStorage);
    }

    if (phasesListFromStorage[parseInt(CurrentPhase) - 1].wasComplete) {
      setPointsPerCorrect(0);
    } else if (!phasesListFromStorage[parseInt(CurrentPhase) - 1].wasComplete) {
      setPointsPerCorrect(20);
    }
  }, [phasesListFromStorage]);

  useEffect(() => {
    if (savedPoints !== totalPoints) {
      // Save points
      setLocalStorageValue(`totalPoints`, totalPoints);
    }
  }, [totalPoints]);

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateEquation(1, 10);
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setTotalPoints(totalPoints + pointsPerCorrect);

      updateProgressBar(true);
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (totalPoints > 0) {
        setTotalPoints(totalPoints - pointsPerCorrect);
      }

      // Mostra a resposta correta  por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      updateProgressBar(false);
    }
  };

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

  // termometer controlls
  const updateProgressBar = (isCorrect) => {
    let NewprogressBar = progressBar;

    if (isCorrect) {
      // Se a resposta estiver correta, aumente o termômetro
      NewprogressBar += 10;

      // Certifique-se de que o termômetro não ultrapasse 100%
      if (NewprogressBar > 100) {
        NewprogressBar = 100;

        phasesList[parseInt(CurrentPhase)].releasedPhase = true;
        phasesList[parseInt(CurrentPhase) - 1].wasComplete = true;

        setLocalStorageValue(PhasesListName, JSON.stringify(phasesList));

        navigateTo(RedirectLevelsUrl);
      }
    } else if (NewprogressBar > 0) {
      // Verifique se o termômetro não está em 0% antes de diminuir

      if (NewprogressBar != 100) {
        NewprogressBar -= 10;
      }

      // Certifique-se de que o termômetro não seja menor que 0%
      if (NewprogressBar < 0) {
        NewprogressBar = 0;
      }
    }
    setProgressBar(NewprogressBar);
  };

  return (
    <MathLayout
      currentRecord={false}
      handleButtonClicked={handleButtonClicked}
      thermometer={false}
      progressBar={progressBar}
      equation={equation}
      response={response}
      playCorrectSound={playCorrectSound}
      isSoundEnabled={isSoundEnabled}
      playWrongSound={playWrongSound}
      setPlayCorrectSound={setPlayCorrectSound}
      setPlayWrongSound={setPlayWrongSound}
    />
  );
}
