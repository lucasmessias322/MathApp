import React, { useState, useEffect, useContext } from "react";
import MathLayout from "../../components/MathLayout";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

export default function AditionGame() {
  const navigateTo = useNavigate();
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const [progressBar, setProgressBar] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(10);

  // buscando pontos salvos
  const savedPoints = Number(localStorage.getItem("totalPoints"));
  const [totalPoints, setTotalPoints] = useState(savedPoints);
  const [points, setPoints] = useState(0);

  const PhaseParam = useParams().phase;

  const { AditionphasesList, setAditionphasesList } = useContext(AppContext);

  useEffect(() => {
    if (savedPoints !== totalPoints) {
      // Save points
      localStorage.setItem(`totalPoints`, totalPoints);
    }
  }, [totalPoints]);

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateAditionEquation(1, 10);
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setTotalPoints(totalPoints + 1);
      setPoints(points + 1);

      updateProgressBar(true);
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (points > 0) {
        setPoints(points - 1);
        setTotalPoints(totalPoints - 1);
      }

      // Mostra a resposta correta  por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      // Chama a função p  ara atualizar o termômetro
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

    AditionphasesList.forEach((item, i) => {
      if (item.phase == PhaseParam) {
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
      NewprogressBar += pointsPerCorrect;

      // Certifique-se de que o termômetro não ultrapasse 100%
      if (NewprogressBar > 100) {
        NewprogressBar = 100;
        navigateTo("/aditionlevels");
      }
    } else if (NewprogressBar > 0) {
      // Verifique se o termômetro não está em 0% antes de diminuir

      if (NewprogressBar != 100) {
        NewprogressBar -= pointsPerCorrect;
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
      points={points}
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
