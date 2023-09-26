import React, { useState, useEffect } from "react";
import * as C from "./style";
import { useParams, useNavigate } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute, FaCoins } from "react-icons/fa";

export default function TabuadaGame() {
  const tabuNumber = parseInt(useParams().tabuada);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [pointsPerCorrect, setPointsPerCorrect] = useState(5);

  const [thermometer, setThermometer] = useState(0);
  const [lastResponseTime, setLastResponseTime] = useState(Date.now());
  // Lê o recorde atual da taboada atual do localStorage
  const currentRecord = localStorage.getItem(`record_${tabuNumber}`);
  const navigateTo = useNavigate();

  const [starsEarned, setStarsEarned] = useState(0);
  const stars = localStorage.getItem(`stars_${tabuNumber}`);

  // buscando pontos salvos
  const savedPoints = Number(localStorage.getItem("points"));
  const [points, setPoints] = useState(savedPoints);

  useEffect(() => {
    if (savedPoints !== points) {
      // Save points
      localStorage.setItem(`points`, points);
    }
  }, [points]);

  useEffect(() => {
    const pointsMapping = {
      0: 5,
      1: 4,
      2: 3,
      3: 2,
      4: 1,
      5: 0.1,
    };

    const points = pointsMapping[stars] || 5;
    setPointsPerCorrect(points);
  }, [stars]);

  const updateThermometer = (isCorrect) => {
    let newThermometer = thermometer;

    if (isCorrect) {
      // Se a resposta estiver correta, aumente o termômetro
      newThermometer += pointsPerCorrect; // Aumente em 2%

      // Certifique-se de que o termômetro não ultrapasse 100%
      if (newThermometer > 100) {
        newThermometer = 100;

        // Certifique-se de que ele não de mais de 5 estrelas
        if (Number(stars) !== 5) {
          // Adicione uma estrela quando o termômetro atingir 100%
          setStarsEarned(starsEarned + 1);

          // Salve o número de estrelas no localStorage
          localStorage.setItem(`stars_${tabuNumber}`, Number(stars) + 1);

          setTimeout(() => {
            navigateTo("/tabuadalevels");
          }, 1500);
        }
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

  // Função para atualizar o recorde específico da taboada atual
  const updateRecord = () => {
    const currentRecord = localStorage.getItem(`record_${tabuNumber}`);
    if (score > parseInt(currentRecord) || currentRecord === null) {
      localStorage.setItem(`record_${tabuNumber}`, score.toString());
    }
  };

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
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
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

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateEquation();
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setScore(score + 1);
      setPoints(points + 1);

      updateThermometer(true);

      // Atualiza o tempo da última resposta
      setLastResponseTime(Date.now());

      updateRecord();
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (score > 0) {
        setScore(score - 1);
        setPoints(points - 1);
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

  return (
    <C.ContainerTabuada fillHeight={thermometer}>
     
      <C.Container> <C.Header>
        <div className="volume" onClick={() => handleButtonClicked("🔊")}>
          {isSoundEnabled ? (
            <FaVolumeUp color="white" size={20} />
          ) : (
            <FaVolumeMute color="white" size={20} />
          )}
        </div>
        <div className="scoreAndRecord">
          <div className="score">
            <FaCoins color="#ffd900" size={20} />
            <span>{score}</span>
          </div>
          <div className="record">
            <FaCoins color="#ffd900" size={20} />
            <span>Max: {currentRecord || 0}</span>
          </div>
        </div>
      </C.Header>
        <C.DisplayEquation>{equation}</C.DisplayEquation>
        <C.DisplayResponse>{response}</C.DisplayResponse>

        <C.ButtonsContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
            <C.Buttons key={value} onClick={() => handleButtonClicked(value)}>
              {value}
            </C.Buttons>
          ))}
        </C.ButtonsContainer>
      </C.Container>
      {playCorrectSound && isSoundEnabled && (
        <audio
          src="/soundeffects/rightanswer.mp3"
          autoPlay
          onEnded={() => setPlayCorrectSound(false)}
        />
      )}
      {playWrongSound && isSoundEnabled && (
        <audio
          src="/soundeffects/mixkit-wrong-electricity-buzz-955.wav"
          autoPlay
          onEnded={() => setPlayWrongSound(false)}
        />
      )}
    </C.ContainerTabuada>
  );
}
