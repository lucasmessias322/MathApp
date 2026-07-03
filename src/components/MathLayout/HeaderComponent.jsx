/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const AudioPlayer = ({ src, play, onEnded }) => (
  <>{play && <audio src={src} autoPlay onEnded={onEnded} />}</>
);

export default function HeaderComponent({
  handleButtonClicked,
  isSoundEnabled,
  playCorrectSound,
  playWrongSound,
  setPlayCorrectSound,
  setPlayWrongSound,
  disableMotion = false,
}) {
  return (
    <Header>
      <OptionsLeft>
        <Option
          onClick={() => handleButtonClicked("DoNothing")}
          $disableMotion={disableMotion}
        >
          <Link to="/">
            <FaHome />
          </Link>
        </Option>

        <Option
          onClick={() => handleButtonClicked("sound-toggle")}
          $disableMotion={disableMotion}
        >
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </Option>
      </OptionsLeft>

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
  padding-bottom: 10px;

  @media (max-width: 500px) {
    padding-bottom: 15px;
  }

  @media (min-width: 701px) and (max-height: 720px) {
    padding-bottom: 8px;
  }
`;

const OptionsLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div`
  width: 44px;
  height: 44px;
  padding: 5px;
  margin: 0 5px;
  font-size: 20px;
  background: linear-gradient(180deg, #7bdcff 0%, #4a9dff 60%, #6b6dff 100%);
  border: 3px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 18px rgba(27, 92, 186, 0.26);
  transition: ${(props) =>
    props.$disableMotion
      ? "none"
      : "transform 0.12s ease-in-out, box-shadow 0.12s ease-in-out"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  color: #ffffff;

  @media (max-width: 500px) {
    width: 48px;
    height: 48px;
  }

  @media (min-width: 701px) and (max-height: 720px) {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    font-size: 18px;
  }

  &:active {
    transform: ${(props) =>
      props.$disableMotion ? "none" : "translateY(2px)"};
    box-shadow: 0 6px 12px rgba(27, 92, 186, 0.22);
  }
`;
