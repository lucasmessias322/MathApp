import React from "react";
import styled from "styled-components";

export default function NivelBarComponent() {
  const totalPoints = Number(localStorage.getItem("totalPoints"));
  // Calcula o nível atual com base nos pontos
  const currentLevel = Math.floor(totalPoints / 1000);

  // Calcula a largura da barra de nível
  const fillWidth = ((totalPoints % 1000) / 1000) * 100;

  return (
    <Container>
      <NivelBarContainer>
        <NivelBar fillwidth={fillWidth}>
          <div className="fillnivelbar">
            <span>Nível {currentLevel}</span>
          </div>
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
  max-width: 400px;
  height: 40px;
  background-color: #fdf5d9;
  border-radius: 20px;
  border: 5px solid #02BAD3;
  margin: 0 auto;

  .fillnivelbar {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/assets/nivelbarprogress.png");
    background-size: ${(props) =>
        props.fillwidth ? props.fillwidth + "%" : "0%"}
      100%;
    background-repeat: no-repeat;
    border-radius: 20px 0 0 20px;
    transition: width 0.5s ease-in-out;

    span {
      text-align: center;
      padding: 15px;
      color: #5a3310;
      font-size: 14px;
      font-weight: bolder;
    }
  }
`;
