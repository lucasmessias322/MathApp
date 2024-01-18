import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MathLayout from "../../components/MathLayout";
import { AppContext } from "../../Contexts/AppContext";

export default function TabuadaGame() {
  const navigateTo = useNavigate();
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(5);
  const [thermometer, setThermometer] = useState(0);
  const [lastResponseTime, setLastResponseTime] = useState(Date.now());
  const [starsEarned, setStarsEarned] = useState(0);
  const tabuNumber = parseInt(useParams().tabuada);
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const savedPoints = Number(getLocalStorageValue("totalPoints"));
  const [totalPoints, setTotalPoints] = useState(savedPoints);
  const stars = getLocalStorageValue(`stars_${tabuNumber}`);

  useEffect(() => {
    if (savedPoints !== totalPoints) {
      // Save points
      setLocalStorageValue(`totalPoints`, totalPoints);
    }
  }, [totalPoints]);

  useEffect(() => {
    const pointsMapping = {
      0: 5,
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 0.1,
    };

    setPointsPerCorrect(pointsMapping[stars] || 5);
  }, [stars]);

  function increaseThermometer() {
    let newThermometer = thermometer;

    newThermometer += pointsPerCorrect;

    // when the termometer is 100%
    if (newThermometer >= 100) {
      newThermometer = 100;

      if (Number(stars) !== 5) {
        //add a star when the thermometer reaches 100%
        setStarsEarned(starsEarned + 1);

        // Save the stars number in the localStorage
        setLocalStorageValue(`stars_${tabuNumber}`, Number(stars) + 1);

        // Redirect the user to the tabuadalevels page
        navigateTo("/tabuadalevels");
      }
    }

    setThermometer(newThermometer);
  }

  function decreaseThermometer() {
    let newThermometer = thermometer;

    // if the termometer is diferente off 100% decrease
    if (newThermometer != 100) {
      newThermometer -= pointsPerCorrect;
    }

    // Certifique-se de que o termômetro não seja menor que 0%
    if (newThermometer < 0) {
      newThermometer = 0;
    }
    setThermometer(newThermometer);
  }

  function decreaseThermometerBasedOnTime(elapsedTime) {
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

  // Decrease termometer based on time
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - lastResponseTime;

      if (elapsedTime >= 2000) {
        decreaseThermometerBasedOnTime(elapsedTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastResponseTime, thermometer]);

  useEffect(() => {
    generateEquation();
  }, [tabuNumber]);

  const generateEquation = () => {
    const num1 = tabuNumber;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    setEquation(`${num1} x ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
  };

  const updatePoints = (isCorrect) => {
    const pointsChange = isCorrect ? 1 : -1;

    setTotalPoints(totalPoints + pointsChange);
  };

  const toggleSounds = (correct) => {
    setPlayCorrectSound(correct);
    setPlayWrongSound(!correct);
  };

  const checkAnswer = () => {
    // Se correto retorna true se errado retorna false
    const isCorrect = parseInt(response) === correctAnswer;

    toggleSounds(isCorrect);
    if (totalPoints > 0) {
      updatePoints(isCorrect);
    }

    if (isCorrect) {
      generateEquation();
      increaseThermometer();

      // Atualiza o tempo da última resposta
      setLastResponseTime(Date.now());
    } else {
      // Mostra a resposta correta  por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      // Chama a função p  ara atualizar o termômetro
      decreaseThermometer();

      // Atualiza o tempo da última resposta mesmo em caso de resposta errada
      setLastResponseTime(Date.now());
    }
  };

  return (
    <MathLayout
      thermometer={thermometer}
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
