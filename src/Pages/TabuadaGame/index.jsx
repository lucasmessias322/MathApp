import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function TabuadaGame() {
  const tabuNumber = parseInt(useParams().tabuada);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

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
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      // Mostra a resposta correta em verde por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);
    }
  };

  return (
    <ContainerTabuada>
      <Header>
        <span className="volume" onClick={() => handleButtonClicked("🔊")}>
          {isSoundEnabled ? (
            <FaVolumeUp color="white" size={20} />
          ) : (
            <FaVolumeMute color="white" size={20} />
          )}
        </span>
        <span className="stars"></span>
      </Header>

      <Container>
        {/* <h2>Tabuada {tabuNumber}</h2> */}
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

const ContainerTabuada = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */

  h2 {
    color: #0471ff;
    font-size: 30px;
    text-align: center;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;

  .volume {
    border: 2px solid #006eff;
    background-color: #006eff;
    padding: 5px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 0 auto; */
`;

const DisplayEquation = styled.div`
  width: 90%;
  max-width: 250px;
  padding: 20px;
  border: 2px solid #006eff;
  background-color: #343541;
  border-radius: 10px;
  height: 40px;
  font-weight: bold;
  font-size: 35px;
  text-align: center;
`;

const DisplayResponse = styled.div`
  width: 90%;
  max-width: 250px;
  padding: 20px;
  border: 2px solid #006eff;
  background-color: #343541;
  border-radius: 10px;
  height: 40px;
  font-weight: bold;
  font-size: 35px;
  text-align: center;
  margin-top: 10px;
`;

const ButtonsContainer = styled.ul`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0px;
  list-style: none;
  margin: 20px auto;
`;

const Buttons = styled.div`
  padding: 10px;
  height: 70px;
  width: 70px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom, #006eff, #0059ce);
  border-radius: 20px;
  border-bottom: 5px solid #174a8d;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  /* &:hover {
    background-color: #343541;
  } */

  &:active {
    transform: scale(0.95);
  }
`;
