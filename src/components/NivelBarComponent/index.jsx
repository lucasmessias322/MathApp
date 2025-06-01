import React from "react";
import styled from "styled-components";

export default function NivelBarComponent() {
  const totalPoints = Number(localStorage.getItem("totalPoints")) || 0;

  const currentLevel = Math.floor(totalPoints / 1000);
  const fillWidth = ((totalPoints % 1000) / 1000) * 100;

  return (
    <Container>
      <NivelBarContainer>
        <NivelBar>
          <Fill fillwidth={fillWidth}>
            <LevelText>Nível {currentLevel}</LevelText>
          </Fill>
        </NivelBar>
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
  border-radius: 40px;

`;

const NivelBar = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  height: 40px;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  border-radius: 20px;
  border: 3px solid #02bad3;
  box-shadow: 0 0 12px rgba(2, 186, 211, 0.6);
  overflow: hidden;
  position: relative;
`;

const Fill = styled.div`
  width: ${(props) => (props.fillwidth ? props.fillwidth + "%" : "0%")};
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(2, 186, 211, 1) 0%,
    rgba(0, 255, 194, 1) 50%,
    rgba(2, 186, 211, 1) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite linear;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.6s ease-in-out;
  box-shadow: inset 0 0 6px rgba(0, 255, 255, 0.8);

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const LevelText = styled.span`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  text-shadow: 0 0 6px rgba(2, 186, 211, 0.8);
`;
