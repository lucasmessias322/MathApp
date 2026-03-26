import { FaBolt } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../Contexts/AppContext";

export default function NivelBarComponent() {
  const { playerProfile } = useContext(AppContext);
  const totalPoints = Number(playerProfile?.totalXp) || 0;
  const totalCoins = Number(playerProfile?.coins) || 0;
  const currentStreak = Number(playerProfile?.currentStreak) || 0;
  const currentLevel = Math.floor(totalPoints / 1000);
  const currentXp = totalPoints % 1000;
  const xpToNext = currentXp === 0 && totalPoints > 0 ? 1000 : 1000 - currentXp;
  const fillWidth = ((totalPoints % 1000) / 1000) * 100;

  return (
    <Container>
      <NivelBarContainer>
        <NivelBar>
          <LevelChip>
            <FaBolt />
            <span>{currentLevel}</span>
          </LevelChip>

          <ProgressCopy>
            <strong>Nivel {currentLevel}</strong>
            <span>{currentXp}/1000 XP</span>
          </ProgressCopy>

          <Fill fillwidth={fillWidth}>
            <TrackGlow />
          </Fill>

          <NextGoal>{xpToNext} XP</NextGoal>
        </NivelBar>

        <MetaRow>
          <MetaChip>
            <GiTwoCoins />
            <span>{totalCoins}</span>
          </MetaChip>
          <MetaChip>Combo {currentStreak}</MetaChip>
        </MetaRow>
      </NivelBarContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NivelBarContainer = styled.div`
  width: 100%;
  border-radius: 999px;
`;

const NivelBar = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  min-height: 72px;
  padding: 10px 14px 10px 82px;
  background: linear-gradient(180deg, #17283c 0%, #0f1c2d 100%);
  border-radius: 999px;
  border: 3px solid #27435f;
  box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.04),
    0 14px 24px rgba(3, 10, 7, 0.35);
  overflow: hidden;
  position: relative;
`;

const LevelChip = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(180deg, #7ed9ff 0%, #419bff 100%);
  border: 4px solid #ffffff;
  box-shadow: 0 10px 18px rgba(5, 20, 11, 0.3);
  color: #0d3155;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 800;
  z-index: 2;

  span {
    font-size: 1rem;
    line-height: 1;
  }
`;

const ProgressCopy = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #f4fff7;
  margin-bottom: 8px;

  strong {
    font-size: 0.98rem;
    line-height: 1;
  }

  span {
    font-size: 0.8rem;
    color: rgba(244, 255, 247, 0.72);
    font-weight: 700;
  }
`;

const Fill = styled.div`
  width: ${(props) => (props.fillwidth ? props.fillwidth + "%" : "0%")};
  height: 14px;
  background: linear-gradient(180deg, #7bdcff 0%, #4aaeff 100%);
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
  border-radius: 999px;
  transition: width 0.6s ease-in-out;
  box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.18),
    0 0 18px rgba(74, 174, 255, 0.28);
  position: relative;
  overflow: hidden;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
`;

const TrackGlow = styled.div`
  position: absolute;
  inset: 2px auto 2px 6px;
  width: calc(100% - 12px);
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.28),
    rgba(255, 255, 255, 0)
  );
`;

const NextGoal = styled.span`
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #8fdcff;
`;

const MetaRow = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetaChip = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(14, 29, 46, 0.72);
  border: 1px solid rgba(123, 201, 255, 0.18);
  color: #e4f7ff;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  svg {
    color: #ffd85e;
    font-size: 1rem;
    filter: drop-shadow(0 0 8px rgba(255, 216, 94, 0.22));
  }
`;
