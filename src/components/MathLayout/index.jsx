/* eslint-disable react/prop-types */
import { memo, useCallback } from "react";
import HeaderComponent from "./HeaderComponent";
import ButtonsCompoent from "./ButtonsCompoent";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Popaudio = new Audio("/soundeffects/happy-pop-2-185287.mp3");

function MathLayout({
  thermometer,
  equation,
  response,
  playCorrectSound,
  isSoundEnabled,
  playWrongSound,
  setPlayCorrectSound,
  setPlayWrongSound,
  progressBar,
  setResponse,
  setIsSoundEnabled,
  checkAnswer,
  feedbackState,
  feedbackTick,
  feedbackMessage,
}) {
  const handleButtonClicked = useCallback((value) => {
    if (isSoundEnabled) {
      Popaudio.currentTime = 0;
      Popaudio.play().catch((error) =>
        console.error("Erro ao iniciar a reproducao:", error)
      );
    }

    if (value === "C") {
      setResponse("");
    } else if (value === "=") {
      checkAnswer();
    } else if (value === "sound-toggle") {
      setIsSoundEnabled(!isSoundEnabled);
    } else if (value === "DoNothing") {
      console.log("DoNothing");
    } else if (response.length <= 10) {
      setResponse((prevResponse) => prevResponse + value);
    }
  }, [checkAnswer, isSoundEnabled, response.length, setIsSoundEnabled, setResponse]);

  return (
    <Container>
      <SkyGlow className="top" />
      <SkyGlow className="bottom" />

      <WaterFill fillheight={thermometer}>
        <Wave style={{ bottom: "0", animationDuration: "6s" }} />
        <Wave
          className="secondary"
          style={{ bottom: "10px", opacity: 0.5, animationDuration: "8s" }}
        />
        <Wave
          className="tertiary"
          style={{ bottom: "20px", opacity: 0.3, animationDuration: "10s" }}
        />
      </WaterFill>

      <ContainerMathGame>
        <AnimatePresence>
          {feedbackState && feedbackState !== "idle" ? (
            <>
              <FeedbackFlash
                key={`${feedbackState}-${feedbackTick}`}
                $feedbackstate={feedbackState}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1.08 }}
                exit={{ opacity: 0, scale: 1.22 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />

              <RewardToast
                key={`toast-${feedbackState}-${feedbackTick}`}
                $feedbackstate={feedbackState}
                initial={{ opacity: 0, y: -12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.94 }}
                transition={{ duration: 0.35 }}
              >
                {feedbackMessage || (feedbackState === "correct" ? "Boa" : "Ops")}
              </RewardToast>
            </>
          ) : null}
        </AnimatePresence>

        <GameTitleArea>
          {/* <small>Hora do desafio</small> */}
          {/* <h1>Resolva a conta</h1> */}
        </GameTitleArea>

        <HeaderComponent
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

        

        <AnimatedDisplay
          key={`equation-${feedbackState}-${feedbackTick}`}
          $feedbackstate={feedbackState}
          animate={
            feedbackState === "correct"
              ? { scale: [1, 1.03, 1], y: [0, -2, 0] }
              : feedbackState === "wrong"
                ? { x: [0, -8, 8, -6, 6, 0] }
                : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 0.45 }}
        >
          <DisplayText>{equation}</DisplayText>
        </AnimatedDisplay>

        <AnimatedDisplay
          key={`response-${feedbackState}-${feedbackTick}`}
          $feedbackstate={feedbackState}
          animate={
            feedbackState === "correct"
              ? { scale: [1, 1.05, 1], y: [0, -3, 0] }
              : feedbackState === "wrong"
                ? { x: [0, -10, 10, -8, 8, 0] }
                : { scale: 1, x: 0, y: 0 }
          }
          transition={{ duration: 0.45 }}
        >
          <DisplayText>{response}</DisplayText>
        </AnimatedDisplay>

        <ButtonsCompoent handleButtonClicked={handleButtonClicked} />
      </ContainerMathGame>
    </Container>
  );
}

const MemoizedMathLayout = memo(MathLayout);

export default MemoizedMathLayout;

const svg = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
  <path fill='%23ffffff' fill-opacity='0.35'
    d='M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,218.7C840,224,960,160,1080,154.7C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'>
  </path>
</svg>`);

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  //padding: 12px 10px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top center, rgba(88, 196, 255, 0.12), transparent 22%),
    radial-gradient(circle at 18% 18%, rgba(255, 98, 130, 0.08), transparent 20%),
    radial-gradient(circle at 82% 18%, rgba(126, 123, 255, 0.1), transparent 20%),
    linear-gradient(180deg, #07131f 0%, #0e2235 46%, #0a1826 100%);
`;

const SkyGlow = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(88, 196, 255, 0.08);
  filter: blur(22px);
  z-index: 0;

  &.top {
    top: -80px;
    right: -60px;
  }

  &.bottom {
    bottom: -90px;
    left: -70px;
    background: rgba(255, 98, 130, 0.08);
  }

  @media (max-width: 600px) {
    filter: none;
    opacity: 0.7;
  }
`;

const WaterFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.fillheight ? props.fillheight + "%" : "0%")};
  background: linear-gradient(
    to top,
    rgba(53, 95, 193, 0.58),
    rgba(96, 195, 255, 0.16)
  );
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

  @media (max-width: 600px) {
    height: 72px;
    animation: none;
    opacity: 0.45;

    &.secondary,
    &.tertiary {
      display: none;
    }
  }
`;

const ContainerMathGame = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 14px 22px 18px;
  border-radius: 34px;
  margin: auto 0;
  background:
    radial-gradient(circle at top right, rgba(255, 98, 130, 0.1), transparent 28%),
    linear-gradient(
      135deg,
      rgba(14, 29, 46, 0.9) 0%,
      rgba(15, 30, 54, 0.88) 55%,
      rgba(27, 35, 76, 0.9) 100%
    );
  border: 1px solid rgba(123, 201, 255, 0.2);
  backdrop-filter: blur(14px);
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  overflow: hidden;

  @media (min-width: 701px) {
    max-width: 420px;
    max-height: calc(100dvh - 24px);
    padding: 14px 20px 16px;
    border-radius: 30px;
  }

  @media (min-width: 701px) and (max-height: 720px) {
    max-width: 390px;
    padding: 10px 18px 12px;
    border-radius: 28px;
  }

  @media (max-width: 600px) {
    padding: 18px 16px 22px;
    border-radius: 24px;
    backdrop-filter: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.26);
  }
`;

const FeedbackFlash = styled(motion.div)`
  position: absolute;
  width: 220px;
  height: 220px;
  left: 50%;
  top: 38%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background: ${(props) =>
    props.$feedbackstate === "wrong"
      ? "radial-gradient(circle, rgba(255, 98, 130, 0.38) 0%, rgba(255, 98, 130, 0) 72%)"
      : "radial-gradient(circle, rgba(123, 220, 255, 0.34) 0%, rgba(123, 220, 255, 0) 72%)"};
  filter: blur(8px);

  @media (max-width: 600px) {
    filter: none;
    opacity: 0.75;
  }
`;

const RewardToast = styled(motion.div)`
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 28px);
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  z-index: 3;
  color: #fff;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${(props) =>
    props.$feedbackstate === "wrong"
      ? "linear-gradient(90deg, rgba(255, 98, 130, 0.95), rgba(255, 140, 116, 0.92))"
      : "linear-gradient(90deg, rgba(60, 157, 255, 0.96), rgba(123, 124, 255, 0.92))"};
  box-shadow: 0 12px 22px
    ${(props) =>
      props.$feedbackstate === "wrong"
        ? "rgba(255, 98, 130, 0.24)"
        : "rgba(60, 157, 255, 0.24)"};

  svg {
    color: #ffe07a;
    font-size: 1rem;
    flex-shrink: 0;
    filter: drop-shadow(0 0 8px rgba(255, 224, 122, 0.32));
  }
`;

const GameTitleArea = styled.div`
  text-align: center;
  margin-bottom: 10px;
  color: #fff;

  small {
    display: inline-flex;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(60, 157, 255, 0.95),
      rgba(123, 124, 255, 0.95)
    );
    font-size: 0.88rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 8px;
    font-size: clamp(2rem, 5vw, 2.35rem);
    line-height: 0.95;
    text-shadow: 0 4px 0 rgba(38, 64, 138, 0.32);
  }

  @media (min-width: 701px) {
    margin-bottom: 8px;

    small {
      padding: 5px 14px;
      font-size: 0.78rem;
    }

    h1 {
      margin-top: 6px;
      font-size: 2rem;
    }
  }

  @media (min-width: 701px) and (max-height: 720px) {
    margin-bottom: 6px;

    small {
      padding: 4px 12px;
      font-size: 0.72rem;
    }

    h1 {
      margin-top: 5px;
      font-size: 1.75rem;
    }
  }
`;

const AnimatedDisplay = styled(motion.div)`
  width: 100%;
  min-height: 84px;
  margin-bottom: 12px;
  background:
    linear-gradient(180deg, #a8bdb5 0%, #c1d1c9 48%, #9cafaa 100%);
  border: 4px solid #071422;
  outline: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  font-size: 44px;
  font-family: "Consolas", "Lucida Console", monospace;
  font-weight: 900;
  letter-spacing: 0;
  color: #152921;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  box-shadow:
    inset 0 9px 14px rgba(5, 14, 17, 0.42),
    inset 0 -3px 5px rgba(255, 255, 255, 0.16),
    inset 7px 0 10px rgba(6, 18, 22, 0.22),
    inset -7px 0 10px rgba(6, 18, 22, 0.16),
    0 1px 0 rgba(255, 255, 255, 0.1);
  text-shadow:
    0 1px 0 rgba(230, 255, 244, 0.5),
    0 0 8px rgba(35, 82, 65, 0.12);
  overflow-wrap: anywhere;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 7px;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 0 22px rgba(24, 47, 43, 0.2);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 6px 10px auto;
    height: 20%;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    filter: blur(8px);
    pointer-events: none;
    z-index: 0;
  }

  ${(props) =>
    props.$feedbackstate === "correct"
      ? "box-shadow: inset 0 9px 14px rgba(5, 14, 17, 0.42), inset 0 -3px 5px rgba(255, 255, 255, 0.16), inset 7px 0 10px rgba(6, 18, 22, 0.22), inset -7px 0 10px rgba(6, 18, 22, 0.16), 0 0 0 2px rgba(123, 220, 255, 0.34);"
      : props.$feedbackstate === "wrong"
        ? "box-shadow: inset 0 9px 14px rgba(5, 14, 17, 0.42), inset 0 -3px 5px rgba(255, 255, 255, 0.16), inset 7px 0 10px rgba(6, 18, 22, 0.22), inset -7px 0 10px rgba(6, 18, 22, 0.16), 0 0 0 2px rgba(255, 98, 130, 0.24);"
        : ""}

  > span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 420px) {
    min-height: 92px;
    margin-bottom: 15px;
    font-size: 36px;
    padding: 0 16px;

    &::after {
      filter: none;
    }
  }

  @media (min-width: 701px) {
    min-height: 72px;
    margin-bottom: 10px;
    border-radius: 11px;
    font-size: 36px;
    padding: 0 18px;
  }

  @media (min-width: 701px) and (max-height: 720px) {
    min-height: 60px;
    margin-bottom: 8px;
    border-radius: 10px;
    font-size: 32px;
    padding: 0 16px;
  }
`;

const DisplayText = styled.span`
  display: block;
  max-width: 100%;
  overflow-wrap: anywhere;
  text-align: right;
`;

const EquationsProgressBarContainer = styled.div`
  width: 100%;
  height: 16px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  overflow: hidden;
  border: 2px solid rgba(123, 201, 255, 0.2);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.24);

  .equationfillBar {
    height: 100%;
    background: linear-gradient(to right, #7bdcff, #4aaeff, #6d72ff);
    width: ${(props) => (props.fillwidth ? props.fillwidth + "%" : "0%")};
    transition: width 0.5s ease-in-out;
    box-shadow: 0 0 10px rgba(74, 174, 255, 0.24);
  }

  @media (min-width: 701px) and (max-height: 720px) {
    height: 12px;
    margin: 8px 0;
  }
`;
