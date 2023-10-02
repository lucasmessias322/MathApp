import React, { useState, useEffect } from "react";
import MathLayout from "../../components/MathLayout";

export default function AditionGame() {
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // termometer
  const [thermometer, setThermometer] = useState(0);
  const [lastResponseTime, setLastResponseTime] = useState(Date.now());
  const [pointsPerCorrect, setPointsPerCorrect] = useState(5);

  // buscando pontos salvos
  const savedPoints = Number(localStorage.getItem("totalPoints"));
  const [totalPoints, setTotalPoints] = useState(savedPoints);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (savedPoints !== totalPoints) {
      // Save points
      localStorage.setItem(`totalPoints`, totalPoints);
    }
  }, [totalPoints]);

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateAditionEquation(1);
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setTotalPoints(totalPoints + 1);
      setPoints(points + 1);

      updateThermometer(true);

      // Atualiza o tempo da última resposta
      setLastResponseTime(Date.now());
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
      updateThermometer(false);

      // Atualiza o tempo da última resposta mesmo em caso de resposta errada
      setLastResponseTime(Date.now());
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

  const generateAditionEquation = (numDigits) => {
    if (numDigits < 1) {
      throw new Error("O número de dígitos deve ser pelo menos 1.");
    }

    const minNum = Math.pow(10, numDigits - 1);
    const maxNum = Math.pow(10, numDigits) - 1;

    const num1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    const num2 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    const result = num1 + num2;
    setEquation(`${num1} + ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
  };

  useEffect(() => {
    generateAditionEquation(1);
  }, []);
  
  // termometer controlls
  const updateThermometer = (isCorrect) => {
    let newThermometer = thermometer;

    if (isCorrect) {
      // Se a resposta estiver correta, aumente o termômetro
      newThermometer += pointsPerCorrect; // Aumente em 2%

      // Certifique-se de que o termômetro não ultrapasse 100%
      if (newThermometer > 100) {
        newThermometer = 100;
      }
    } else if (newThermometer > 0) {
      // Verifique se o termômetro não está em 0% antes de diminuir

      if (newThermometer != 100) {
        newThermometer -= pointsPerCorrect; // Diminua em 2%
      }

      // Certifique-se de que o termômetro não seja menor que 0%
      if (newThermometer < 0) {
        newThermometer = 0;
      }
    }

    setThermometer(newThermometer);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - lastResponseTime;

      if (elapsedTime >= 2000) {
        // Se passaram 2 segundos ou mais sem resposta
        const decreaseAmount = Math.floor((elapsedTime / 1000) * 1); // Diminui 1% por segundo
        const newThermometer = thermometer - decreaseAmount;

        // Certifique-se de que o termômetro não seja menor que 0%
        if (newThermometer < 0) {
          setThermometer(0);

          // se termometro for diferente de 100 decrementar caso contrario não fazer nada!
        } else if (thermometer !== 100) {
          setThermometer(newThermometer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastResponseTime, thermometer]);
  //

  return (
    <MathLayout
      points={points}
      currentRecord={false}
      handleButtonClicked={handleButtonClicked}
      thermometer={thermometer}
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
