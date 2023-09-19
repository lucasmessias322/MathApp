import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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
  const [thermometer, setThermometer] = useState(0);
  const [lastResponseTime, setLastResponseTime] = useState(Date.now());

  const updateThermometer = (isCorrect) => {
    let newThermometer = thermometer;

    if (isCorrect) {
      // Se a resposta estiver correta, aumente o termômetro
      newThermometer += 5; // Aumente em 5%

      // Certifique-se de que o termômetro não ultrapasse 100%
      if (newThermometer > 100) {
        newThermometer = 100;
      }
    } else {
      // Se a resposta estiver errada, diminua o termômetro
      newThermometer -= 5; // Diminua em 5%

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
        } else {
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
      setScore(score + 1); // Increment score on correct answer

      // Chama a função para atualizar o termômetro
      updateThermometer(true);

      // Atualiza o tempo da última resposta
      setLastResponseTime(Date.now());

      // Chamada para atualizar o recorde
      updateRecord();
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (score > 0) {
        setScore(score - 1); // Decrement score on wrong answer, but only if score is positive
      }

      // Mostra a resposta correta  por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);

      // Chama a função para atualizar o termômetro
      updateThermometer(false);

      // Atualiza o tempo da última resposta mesmo em caso de resposta errada
      setLastResponseTime(Date.now());
    }
  };

  // Lê o recorde atual da taboada atual do localStorage
  const currentRecord = localStorage.getItem(`record_${tabuNumber}`);

  return (
    <ContainerTabuada>
      <Header>
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
      </Header>
      <Container>
        <ThermometerContainer>
          <ThermometerFill style={{ width: `${thermometer}%` }} />
        </ThermometerContainer>
        <DisplayEquation>{equation}</DisplayEquation>
        <DisplayResponse>{response}</DisplayResponse>

        <ButtonsContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
            <Buttons key={value} onClick={() => handleButtonClicked(value)}>
              {value}
            </Buttons>
          ))}
        </ButtonsContainer>
      </Container>
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
    </ContainerTabuada>
  );
}

const ThermometerContainer = styled.div`
  width: 100%;
  height: 5px; /* Altura do termômetro */
  background-color: #ccc; /* Cor de fundo do termômetro */
  border-radius: 5px; /* Borda arredondada */
  margin: 5px 0px;

  /* Adicione outros estilos conforme necessário */
`;

const ThermometerFill = styled.div`
  height: 100%;
  background-color: #06f; /* Cor de preenchimento do termômetro */
  border-radius: 5px 0 0 5px; /* Borda arredondada apenas no lado esquerdo */
  transition: width 0.5s ease-in-out; /* Efeito de transição suave para a largura */

  /* Adicione outros estilos conforme necessário */
`;

const ContainerTabuada = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  h2 {
    color: #0471ff;
    font-size: 30px;
    text-align: center;
  }
`;

const Header = styled.header`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 15px;

  .volume {
    border: 2px solid #006eff;
    background-color: #006eff;
    padding: 5px;
    margin: 10px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .scoreAndRecord {
    display: flex;
    .score {
      background-color: #006eff;
      padding: 5px 10px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      span {
        font-size: 18px;
        color: #ffffff;
        padding-left: 10px;
      }
    }
    .record {
      background-color: #006eff;
      padding: 5px 20px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;

      span {
        font-size: 18px;
        color: #ffffff;
        padding-left: 10px;
      }
    }
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 500px) {
    padding: 0px;
  }
`;

const DisplayEquation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  border: 2px solid #006eff;
  background-color: #19191f;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

const DisplayResponse = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  border: 2px solid #006eff;
  background-color: #19191f;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-top: 10px;
`;

// const ButtonsContainer = styled.ul`
//   width: 100%;
//   max-width: 350px;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   list-style: none;
//   margin: 10px auto;
// `;

// const Buttons = styled.button`
//   outline: none;
//   border: none;
//   padding: 20px;
//   height: 90px;
//   width: 90px;
//   margin: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 35px;
//   font-weight: bold;
//   color: white;
//   background: linear-gradient(180deg, #016fff 0%, #024194 100%);
//   box-shadow: 0px 4px 4px 0px #001736;
//   border-radius: 10px;
//   cursor: pointer;
//   transition: transform 0.1s ease-in-out;
//   user-select: none;

//   &:active {
//     transform: scale(0.95);
//     box-shadow: 0px 4px 4px 0px #001736 inset;
//   }

//   @media (min-width: 500px) {
//     height: 80px;
//     width: 80px;
//   }
// `;

const ButtonsContainer = styled.ul`
  width: 100%;
  max-width: 240px; /* Aumente a largura máxima para caber 3 botões por linha em dispositivos móveis */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas por linha */
  grid-column-gap: 0px; /* Espaçamento entre as colunas verticais dos botões */
  grid-row-gap: 0px; /* Espaçamento entre as linhas dos botões */
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 10px auto;

  @media (max-width: 500px) {
    max-width: 240px; /* Aumente a largura máxima para telas maiores, se necessário */
  }
`;

const Buttons = styled.button`
  outline: none;
  border: none;
  /* padding: 20px; */
  height: 90px;
  width: 90px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom, #006eff, #0050b9);
  box-shadow: 0px 4px 4px 0px #001736;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  user-select: none;

  &:active {
    transform: scale(0.95);
    box-shadow: 0px 4px 4px 0px #001736 inset;
  }

  @media (min-width: 500px) {
    height: 80px;
    width: 80px;
    font-size: 30px;
  }

  @media (max-width: 300px) {
    height: 70px;
    width: 70px;
    font-size: 30px;
  }
`;
