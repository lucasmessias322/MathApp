import React, { useEffect } from "react";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AudioPlayer = ({ src, play, onEnded }) => (
  <>{play && <audio src={src} autoPlay onEnded={onEnded} />}</>
);

export default function HeaderComponent({
  handleButtonClicked,
  isSoundEnabled,
  recordGamePoints,
  currentGamepoints,
  playCorrectSound,
  playWrongSound,
  setPlayCorrectSound,
  setPlayWrongSound,
}) {
  return (
    <Header>
      <OptionsLeft>
        <Option onClick={() => handleButtonClicked("DoNothing")}>
          <Link to="/">
            <FaHome />
          </Link>
        </Option>
        <Option
          active={!isSoundEnabled}
          onClick={() => handleButtonClicked("🔊")}
        >
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </Option>
      </OptionsLeft>
      {recordGamePoints >= 0 && (
        <h2>
          {currentGamepoints}/{recordGamePoints}
        </h2>
      )}

      <AudioPlayer
        src="/soundeffects/rightanswer.mp3"
        play={playCorrectSound && isSoundEnabled}
        onEnded={() => setPlayCorrectSound(false)}
      />
      <AudioPlayer
        src="/soundeffects/mixkit-wrong-electricity-buzz-955.wav"
        play={playWrongSound && isSoundEnabled}
        onEnded={() => setPlayWrongSound(false)}
      />
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`;

const OptionsLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div`
  width: 35px;
  height: 35px;
  padding: 5px;
  margin: 0px 5px;
  font-size: 20px;
  background: linear-gradient(145deg, #02b8cc, #029bb3);
  border: 4px solid #01a2b0;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.4),
    -4px -4px 8px rgba(255, 255, 255, 0.1), inset 0 -3px 6px rgba(0, 0, 0, 0.3),
    inset 0 3px 6px rgba(255, 255, 255, 0.05);
  transition: transform 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  &:active {
    transform: translateY(4px);
    background: linear-gradient(to bottom, #02aecc, #017c94);
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5),
      inset 0 -3px 6px rgba(255, 255, 255, 0.05);
  }
`;
