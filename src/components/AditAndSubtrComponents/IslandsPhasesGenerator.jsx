import { VscBook } from "react-icons/vsc";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

export default function IslandsPhasesGenerator({
  phasesList,
  calculateMarginLeft,
  gameUrlPath,
}) {
  let lastReleasedPhase = -1;

  phasesList.forEach((item, index) => {
    if (item.releasedPhase) {
      lastReleasedPhase = index;
    }
  });

  return (
    <PhasesContainer>
      {phasesList.map((item, index) => (
        <PhaseItem
          key={index}
          $unlocked={item.releasedPhase} // ✅ Corrigido com prefixo "$"
          $highlight={lastReleasedPhase === index} // ✅ Corrigido com prefixo "$"
          style={{ marginLeft: `${calculateMarginLeft(index)}px` }}
        >
          <Link to={item.releasedPhase ? `${gameUrlPath}/${item.phase}` : ""}>
            <VscBook />
          </Link>
        </PhaseItem>
      ))}
    </PhasesContainer>
  );
}

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
`;

const PhasesContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const PhaseItem = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: ${(props) =>
    props.$unlocked ? "4px solid #00ffe5" : "3px dashed #777"};
  background: ${(props) =>
    props.$unlocked
      ? "linear-gradient(145deg, #00b7ff, #02687d)"
      : "linear-gradient(145deg, #555, #333)"};
  opacity: ${(props) => (props.$unlocked ? 1 : 0.4)};
  box-shadow: ${(props) =>
    props.$unlocked
      ? "0 8px 16px rgba(0, 255, 229, 0.4)"
      : "0 4px 8px rgba(0,0,0,0.6)"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  cursor: ${(props) => (props.$unlocked ? "pointer" : "not-allowed")};

  ${(props) =>
    props.$highlight &&
    css`
      animation: ${float} 2s ease-in-out infinite;
    `}

  &:hover {
    transform: ${(props) => (props.$unlocked ? "scale(1.08)" : "none")};
    box-shadow: ${(props) =>
      props.$unlocked
        ? "0 12px 24px rgba(0, 255, 229, 0.6)"
        : "0 4px 8px rgba(0,0,0,0.6)"};
  }

  a {
    color: ${(props) => (props.$unlocked ? "#fff" : "#aaa")};
    font-size: 38px;
    text-decoration: none;
    pointer-events: ${(props) => (props.$unlocked ? "auto" : "none")};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
