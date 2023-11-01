import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../../components/MathLayout";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";
import { AditionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";

export default function AditionGame() {
  const navigateTo = useNavigate();
  const { getLocalStorageValue, setLocalStorageValue, savedPoints } =
    useContext(AppContext);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(0);
  const [totalPoints, setTotalPoints] = useState(
    Number(getLocalStorageValue("totalPoints"))
  );
  const [phasesList, setPhasesList] = useState(AditionphasesList);

  const CurrentPhase = useParams().phase;

  const phasesListFromStorage = JSON.parse(
    getLocalStorageValue("aditionphasesList")
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
  }, []);

  useEffect(() => {
    if (savedPoints !== totalPoints) {
      // Save points
      setLocalStorageValue(`totalPoints`, totalPoints);
    }
  }, [totalPoints]);

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateAditionEquation(1, 10);
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

  const generateAditionEquation = () => {
    let minRange;
    let maxRange;

    phasesList.forEach((item, i) => {
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

  useEffect(() => {
    generateAditionEquation(1, 10);
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

        setLocalStorageValue("aditionphasesList", JSON.stringify(phasesList));

        navigateTo("/aditionlevels");
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
