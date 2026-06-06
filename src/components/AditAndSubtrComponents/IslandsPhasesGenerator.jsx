/* eslint-disable react/prop-types */
import { VscBook } from "react-icons/vsc";
import { FaLock, FaStar } from "react-icons/fa";
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
          $unlocked={item.releasedPhase}
          $highlight={lastReleasedPhase === index}
          style={{ marginLeft: `${calculateMarginLeft(index)}px` }}
        >
          <Link to={item.releasedPhase ? `${gameUrlPath}/${item.phase}` : ""}>
            <Badge>{item.phase + 1}</Badge>
            <IconWrap>{item.releasedPhase ? <VscBook /> : <FaLock />}</IconWrap>
            <PhaseLabel>{item.releasedPhase ? "Jogar" : "Bloqueada"}</PhaseLabel>

            {lastReleasedPhase === index && (
              <HighlightBadge>
                <FaStar />
                Nova
              </HighlightBadge>
            )}
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
  padding: 28px 12px 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const PhaseItem = styled.button`
  width: 148px;
  min-height: 150px;
  border-radius: 34px;
  border: ${(props) =>
    props.$unlocked
      ? "1px solid rgba(123, 201, 255, 0.22)"
      : "1px dashed rgba(255,255,255,0.28)"};
  background: ${(props) =>
    props.$unlocked
      ? "linear-gradient(135deg, #17314c 0%, #143052 55%, #232f70 100%)"
      : "linear-gradient(135deg, rgba(16, 29, 47, 0.7) 0%, rgba(23, 35, 61, 0.58) 100%)"};
  box-shadow: ${(props) =>
    props.$unlocked
      ? "0 18px 30px rgba(4, 12, 23, 0.3)"
      : "0 12px 20px rgba(4, 12, 23, 0.18)"};
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  cursor: ${(props) => (props.$unlocked ? "pointer" : "not-allowed")};
  padding: 0;

  ${(props) =>
    props.$highlight &&
    css`
      animation: ${float} 2s ease-in-out infinite;
    `}

  &:hover {
    transform: ${(props) => (props.$unlocked ? "scale(1.08)" : "none")};
    box-shadow: ${(props) =>
      props.$unlocked
        ? "0 24px 36px rgba(44, 95, 204, 0.22)"
        : "0 12px 20px rgba(4, 12, 23, 0.18)"};
  }

  @media (max-width: 600px) {
    animation: none;
    transition: transform 0.12s ease;

    &:hover {
      transform: none;
    }
  }

  a {
    min-height: 146px;
    color: ${(props) => (props.$unlocked ? "#f2fbff" : "rgba(255,255,255,0.72)")};
    font-size: 38px;
    text-decoration: none;
    pointer-events: ${(props) => (props.$unlocked ? "auto" : "none")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px 12px 14px;
  }
`;

const Badge = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(180deg, #7bdcff 0%, #3c9dff 65%, #6b6dff 100%);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 18px rgba(60, 157, 255, 0.28);
`;

const IconWrap = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ff8d74 0%, #ff5f7a 100%);
  color: #fff;
  box-shadow: 0 12px 20px rgba(255, 95, 122, 0.22);
`;

const PhaseLabel = styled.span`
  font-size: 1rem;
  font-weight: 800;
  line-height: 0.95;
`;

const HighlightBadge = styled.span`
  position: absolute;
  top: -14px;
  right: -8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, #3c9dff, #7b7cff);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 800;
  box-shadow: 0 10px 18px rgba(60, 157, 255, 0.18);
`;
