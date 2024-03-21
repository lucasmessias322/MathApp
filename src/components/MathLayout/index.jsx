import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import ButtonsCompoent from "./ButtonsCompoent";
import styled from "styled-components";
const Popaudio = new Audio("/soundeffects/happy-pop-2-185287.mp3");

export default function MathLayout({
  thermometer,
  equation,
  response,
  playCorrectSound,
  isSoundEnabled,
  playWrongSound,
  setPlayCorrectSound,
  setPlayWrongSound,
  progressBar,
  recordGamePoints,
  currentGamepoints,
  setResponse,
  setIsSoundEnabled,
  checkAnswer,
}) {
  const handleButtonClicked = (value) => {
    Popaudio.currentTime = 0; // Reinicia a reprodução
    Popaudio.play().catch((error) =>
      console.error("Erro ao iniciar a reprodução:", error)
    );
    switch (value) {
      case "C":
        setResponse("");
        break;
      case "=":
        checkAnswer();
        break;
      case "🔊":
        setIsSoundEnabled(!isSoundEnabled);
        break;
      case "DoNothing":
        break;
      default:
        setResponse((prevResponse) => prevResponse + value);
        break;
    }
  };
  return (
    <Container fillheight={thermometer}>
      <ContainerMathGame>
        <HeaderComponent
          recordGamePoints={recordGamePoints}
          currentGamepoints={currentGamepoints}
          handleButtonClicked={handleButtonClicked}
          isSoundEnabled={isSoundEnabled}
          playCorrectSound={playCorrectSound}
          playWrongSound={playWrongSound}
          setPlayCorrectSound={setPlayCorrectSound}
          setPlayWrongSound={setPlayWrongSound}
        />

        {progressBar ? (
          <EquationsProgressBarContainer fillwidth={progressBar}>
            <div className="equationfillBar"></div>
          </EquationsProgressBarContainer>
        ) : (
          ""
        )}

        <DisplayEquation>{equation}</DisplayEquation>
        <DisplayResponse>{response}</DisplayResponse>
        <ButtonsCompoent handleButtonClicked={handleButtonClicked} />
      </ContainerMathGame>
    </Container>
  );
}

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5px 10px;

  transition: 1s ease-in-out;
  background: url("/assets/termometerbg.png");
  background-size: 100%
    ${(props) => (props.fillheight ? props.fillheight + "%" : "0%")};
  background-repeat: no-repeat;
  background-position: bottom center;
`;

const ContainerMathGame = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: fixed;
  top: 0;
`;

const DisplayEquation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px 0px;
  border: 2px solid #006eff;
  background-color: transparent;
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
  background-color: transparent;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-top: 10px;
`;

const EquationsProgressBarContainer = styled.div`
  width: 100%;
  width: 100%;
  height: 5px;
  background: #121216;

  div.equationfillBar {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/assets/nivelbarprogress.png");
    background-size: ${(props) =>
        props.fillwidth ? props.fillwidth + "%" : "0%"}
      100%;
    background-repeat: no-repeat;
    transition: width 0.5s ease-in-out;
  }
`;
