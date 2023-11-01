import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../../components/MathLayout";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";
import { SubtractionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";

export default function SubtractionGame() {
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
  const [phasesList, setPhasesList] = useState(SubtractionphasesList);

  const CurrentPhase = useParams().phase;

  const phasesListFromStorage = JSON.parse(
    getLocalStorageValue("subtractionphasesList")
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

  const checkAnswer = ({ generateEquation = Function }) => {
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
      checkAnswer({ generateEquation: generateSubtractionEquation });
    } else if (value === "🔊") {
      setIsSoundEnabled(!isSoundEnabled);
    } else {
      setResponse(response + value);
    }
  };

  const generateSubtractionEquation = () => {
    let minRange;
    let maxRange;

    phasesList.forEach((item, i) => {
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

  useEffect(() => {
    generateSubtractionEquation();
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

        setLocalStorageValue(
          "subtractionphasesList",
          JSON.stringify(phasesList)
        );

        navigateTo("/subtractionlevels");
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
