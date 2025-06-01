
import React from "react";
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
    Popaudio.currentTime = 0;
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
    <Container>
      <WaterFill fillheight={thermometer}>
        <Wave style={{ bottom: "0", animationDuration: "6s" }} />
        <Wave
          style={{ bottom: "10px", opacity: 0.5, animationDuration: "8s" }}
        />
        <Wave
          style={{ bottom: "20px", opacity: 0.3, animationDuration: "10s" }}
        />
      </WaterFill>

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
        ) : null}

        <Display>{equation}</Display>
        <Display>{response}</Display>
        <ButtonsCompoent handleButtonClicked={handleButtonClicked} />
      </ContainerMathGame>
    </Container>
  );
}
const svg = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <path fill='%2302d0e8' fill-opacity='0.4' 
    d='M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,218.7C840,224,960,160,1080,154.7C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'>
  </path>
</svg>`);

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
  background-color: #001f2e;
`;

const WaterFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.fillheight ? props.fillheight + "%" : "0%")};
  background: linear-gradient(to top, #0284a366, #02d0e866);
  transition: height 1s ease-in-out;
  overflow: hidden;
`;

const Wave = styled.div`
  position: absolute;
  width: 200%;
  height: 100px;
  background: url("data:image/svg+xml,${svg}");

  background-size: cover;
  animation: waveAnimation linear infinite;
  opacity: ${(props) => props.opacity || 0.7};

  @keyframes waveAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const ContainerMathGame = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px 30px;
  border-radius: 30px;
  margin: 0 auto;
  background: rgba(0, 32, 46, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 2;
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
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8),
    inset 0 -4px 8px rgba(255, 255, 255, 0.05), 0 4px 8px rgba(0, 0, 0, 0.4);
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
