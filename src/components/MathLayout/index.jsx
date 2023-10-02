import React from "react";
import HeaderComponent from "./HeaderComponent";
import ButtonsCompoent from "./ButtonsCompoent";
import styled from "styled-components";

export default function MathLayout({
  points,
  currentTabuPointsRecord,
  handleButtonClicked,
  thermometer,
  equation,
  response,
  playCorrectSound,
  isSoundEnabled,
  playWrongSound,
  setPlayCorrectSound,
  setPlayWrongSound,
}) {
  return (
    <Container fillHeight={thermometer}>
      <ContainerMathGame>
        <HeaderComponent
          points={points}
          currentTabuPointsRecord={currentTabuPointsRecord}
          handleButtonClicked={handleButtonClicked}
          isSoundEnabled={isSoundEnabled}
        />
        <DisplayEquation>{equation}</DisplayEquation>
        <DisplayResponse>{response}</DisplayResponse>
        <ButtonsCompoent handleButtonClicked={handleButtonClicked} />
      </ContainerMathGame>
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
  background: url("/termometerbg.png");
  background-size: 100%
    ${(props) => (props.fillHeight ? props.fillHeight + "%" : "0%")};
  background-repeat: no-repeat;
  background-position: bottom center;
`;

const ContainerMathGame = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: fixed;
  top: 0;

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
