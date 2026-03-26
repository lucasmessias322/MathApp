/* eslint-disable react/prop-types */
import HeaderComponent from "./HeaderComponent";
import ButtonsCompoent from "./ButtonsCompoent";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { GiTwoCoins } from "react-icons/gi";

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
  feedbackState,
  feedbackTick,
  feedbackMessage,
}) {
  const handleButtonClicked = (value) => {
    Popaudio.currentTime = 0;
    Popaudio.play().catch((error) =>
      console.error("Erro ao iniciar a reproducao:", error)
    );

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
  };

  const showCoinIcon = feedbackMessage?.toLowerCase().includes("moedas");

  return (
    <Container>
      <SkyGlow className="top" />
      <SkyGlow className="bottom" />

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
                {showCoinIcon ? <GiTwoCoins /> : null}
                {feedbackMessage || (feedbackState === "correct" ? "Boa" : "Ops")}
              </RewardToast>
            </>
          ) : null}
        </AnimatePresence>

        <GameTitleArea>
          <small>Hora do desafio</small>
          <h1>Resolva a conta</h1>
        </GameTitleArea>

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
          {equation}
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
          {response}
        </AnimatedDisplay>

        <ButtonsCompoent handleButtonClicked={handleButtonClicked} />
      </ContainerMathGame>
    </Container>
  );
}

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
  min-height: 100vh;
  padding: 24px 10px 28px;
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
`;

const ContainerMathGame = styled.div`
  width: 100%;
  max-width: 440px;
  padding: 22px 22px 24px;
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

  @media (max-width: 600px) {
    padding: 18px 16px 22px;
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
  margin-bottom: 14px;
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
    margin-top: 10px;
    font-size: clamp(2rem, 5vw, 2.35rem);
    line-height: 0.95;
    text-shadow: 0 4px 0 rgba(38, 64, 138, 0.32);
  }
`;

const AnimatedDisplay = styled(motion.div)`
  width: 100%;
  min-height: 92px;
  margin-bottom: 15px;
  background: linear-gradient(180deg, #ffffff 0%, #eef7ff 70%, #f7fbff 100%);
  border: 3px solid rgba(255, 255, 255, 0.92);
  border-radius: 26px;
  font-size: 44px;
  font-weight: 800;
  color: #17324d;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  box-shadow: inset 0 3px 10px rgba(80, 108, 199, 0.08),
    0 14px 24px rgba(68, 94, 191, 0.12);
  overflow-wrap: anywhere;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.$feedbackstate === "correct"
      ? "box-shadow: inset 0 3px 10px rgba(80, 108, 199, 0.08), 0 0 0 2px rgba(123, 220, 255, 0.34), 0 16px 28px rgba(74, 174, 255, 0.18);"
      : props.$feedbackstate === "wrong"
        ? "box-shadow: inset 0 3px 10px rgba(80, 108, 199, 0.08), 0 0 0 2px rgba(255, 98, 130, 0.22), 0 16px 28px rgba(255, 98, 130, 0.14);"
        : ""}

  @media (max-width: 420px) {
    font-size: 36px;
    padding: 0 16px;
  }
`;

const EquationsProgressBarContainer = styled.div`
  width: 100%;
  height: 16px;
  margin: 15px 0;
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
`;
