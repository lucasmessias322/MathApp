/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
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
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [phasesList, setPhasesList] = useState(PhasesList);

  useEffect(() => {
    generateEquation();
  }, []);

  useEffect(() => {
    const phasesListFromStorage = JSON.parse(
      getLocalStorageValue(PhasesListName)
    );

    if (!phasesListFromStorage) {
      setPhasesList(PhasesList);
    } else {
      setPhasesList(phasesListFromStorage);
    }
  }, [CurrentPhase]);

  useEffect(() => {
    if (feedbackState === "idle") {
      return undefined;
    }

    const timer = setTimeout(() => {
      setFeedbackState("idle");
    }, 650);

    return () => clearTimeout(timer);
  }, [feedbackState, feedbackTick]);

  function getCurrentPhaseData() {
    const phaseIndex = Math.max(0, parseInt(CurrentPhase) - 1);
    const currentPhaseData = phasesList[phaseIndex];

    return {
      phaseIndex,
      phaseNumber: phaseIndex + 1,
      phaseData: currentPhaseData,
      isFirstCompletion: !currentPhaseData?.wasComplete,
    };
  }

  const checkAnswer = () => {
    const isCorrect = parseInt(response) === correctAnswer;

    setFeedbackState(isCorrect ? "correct" : "wrong");
    setFeedbackTick((prevTick) => prevTick + 1);
    setFeedbackMessage(isCorrect ? "Boa resposta" : "Tente de novo");

    if (isCorrect) {
      generateEquation();
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      updateProgressBar(true);
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      updateProgressBar(false);
    }
  };

  const updateProgressBar = (isCorrect) => {
    let newProgressBar = progressBar;

    if (isCorrect) {
      newProgressBar += 10;

      if (newProgressBar > 100) {
        newProgressBar = 100;
        const { phaseIndex, phaseData } = getCurrentPhaseData();
        const updatedPhases = [...phasesList];

        if (updatedPhases[phaseIndex + 1]) {
          updatedPhases[phaseIndex + 1] = {
            ...updatedPhases[phaseIndex + 1],
            releasedPhase: true,
          };
        }

        updatedPhases[phaseIndex] = {
          ...updatedPhases[phaseIndex],
          wasComplete: true,
        };

        setPhasesList(updatedPhases);
        setLocalStorageValue(PhasesListName, JSON.stringify(updatedPhases));

        if (!phaseData?.wasComplete) {
          setFeedbackMessage("Fase concluida");
        }

        navigateTo(RedirectLevelsUrl);
      }
    } else if (newProgressBar > 0) {
      if (newProgressBar !== 100) {
        newProgressBar -= 10;
      }

      if (newProgressBar < 0) {
        newProgressBar = 0;
      }
    }

    setProgressBar(newProgressBar);
  };

  return (
    <MathLayout
      progressBar={progressBar}
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
