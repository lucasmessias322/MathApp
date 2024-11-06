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

    if (value === "C") {
      setResponse("");
    } else if (value === "=") {
      checkAnswer();
    } else if (value === "🔊") {
      setIsSoundEnabled(!isSoundEnabled);
    } else if (value === "DoNothing") {
      console.log("DoNothing");
    } else {
      if (response.length <= 10) {
        setResponse((prevResponse) => prevResponse + value);
      }
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

        <Display>{equation}</Display>
        <Display>{response}</Display>
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

const Display = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px 0px;
  border: 2px solid #4470c7;
  border-left: 5px solid #4470c7;
  border-right: 5px solid #4470c7;
  background-color: transparent;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-bottom: 5px;
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
