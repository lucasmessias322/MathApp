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
  background: linear-gradient(to bottom right, #00202e, #00121f);
  height: 100%;
  padding: 0px 10px;
`;

const ContainerMathGame = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px 30px;
  border-radius: 30px;
  margin: 0 auto;
  background: rgba(0, 32, 46, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
`;

const Display = styled.div`
  width: 100%;
  height: 90px;
  margin-bottom: 15px;
  background: linear-gradient(145deg, #014559, #012936);
  border: 5px solid #02a4cc;
  border-radius: 20px;
  font-size: 44px;
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
  color: #15ff00;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8),
              inset 0 -4px 8px rgba(255, 255, 255, 0.05),
              0 4px 8px rgba(0, 0, 0, 0.4);
  text-shadow: 1px 1px 2px rgba(21, 255, 0, 0.7);
`;

const EquationsProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  margin: 15px 0;
  background: #012331;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #02a4cc;
  box-shadow: inset 0 2px 4px rgba(0, 255, 255, 0.2);

  .equationfillBar {
    height: 100%;
    background: linear-gradient(to right, #02d0e8, #0284a3);
    width: ${(props) => (props.fillwidth ? props.fillwidth + "%" : "0%")};
    transition: width 0.5s ease-in-out;
    box-shadow: 0 0 10px rgba(2, 208, 232, 0.7);
  }
`;
