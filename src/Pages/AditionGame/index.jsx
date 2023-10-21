import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../../components/MathLayout";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";
import AditionphasesList from "../../components/AditionComponents/aditionphasesList.js";


export default function AditionGame() {
  const navigateTo = useNavigate();
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(20);
  const [totalPoints, setTotalPoints] = useState(
    Number(getLocalStorageValue("totalPoints"))
  );
  const [newaditionphasesList, setNewaditionphasesList] =
    useState(AditionphasesList);

  // buscando pontos salvos
  const savedPoints = Number(getLocalStorageValue("totalPoints"));

  const CurrentPhase = useParams().phase;

  const aditionphasesListFromStorage = JSON.parse(
    getLocalStorageValue("aditionphasesList")
  );

  useEffect(() => {
    if (!aditionphasesListFromStorage) {
      setNewaditionphasesList(AditionphasesList);
    } else {
      setNewaditionphasesList(aditionphasesListFromStorage);
    }

    if (newaditionphasesList.wasComplete) {
      setPointsPerCorrect(0);
    } else {
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

    newaditionphasesList.forEach((item, i) => {
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

        newaditionphasesList[parseInt(CurrentPhase)].releasedPhase = true;
        newaditionphasesList[parseInt(CurrentPhase) - 1].wasComplete = true;

        setLocalStorageValue(
          "aditionphasesList",
          JSON.stringify(newaditionphasesList)
        );

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
