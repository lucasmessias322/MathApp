/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaHome, FaTrophy } from "react-icons/fa";
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

        <Option onClick={() => handleButtonClicked("sound-toggle")}>
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </Option>
      </OptionsLeft>

      {recordGamePoints >= 0 && (
        <ScoreBadge>
          <FaTrophy />
          <span>
            {currentGamepoints}/{recordGamePoints}
          </span>
        </ScoreBadge>
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
  max-width: 440px;
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
  width: 48px;
  height: 48px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  background: linear-gradient(180deg, #7bdcff 0%, #4a9dff 60%, #6b6dff 100%);
  border: 3px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 18px rgba(27, 92, 186, 0.26);
  transition: transform 0.12s ease-in-out, box-shadow 0.12s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  color: #ffffff;

  &:active {
    transform: translateY(2px);
    box-shadow: 0 6px 12px rgba(27, 92, 186, 0.22);
  }
`;

const ScoreBadge = styled.div`
  min-width: 118px;
  padding: 10px 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, #17314c 0%, #143052 55%, #232f70 100%);
  border: 1px solid rgba(123, 201, 255, 0.22);
  box-shadow: 0 12px 20px rgba(4, 12, 23, 0.28);
  color: #7bdcff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  span {
    font-size: 1.15rem;
    font-weight: 800;
    color: #f2fbff;
  }
`;
