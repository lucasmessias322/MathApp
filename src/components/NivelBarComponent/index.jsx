import React from "react";
import styled from "styled-components";

export default function NivelBarComponent() {
  const totalPoints = Number(localStorage.getItem("totalPoints"));
  // Calcula o nível atual com base nos pontos
  const currentLevel = Math.floor(totalPoints / 500);

  // Calcula a largura da barra de nível
  const fillWidth = ((totalPoints % 500) / 500) * 100;

  return (
    <Container>
      <NivelBar fillWidth={fillWidth}>
        <div className="fillnivelbar">
          <span>Nível {currentLevel}</span>
        </div>
      </NivelBar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #19191f;

  position: fixed;
  z-index: 999;

  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NivelBar = styled.div`
  width: 100%;
  height: 25px;
  background: #121216;
  border-radius: 20px;

  .fillnivelbar {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/nivelbarprogress.png");
    background-size: ${(props) =>
        props.fillWidth ? props.fillWidth + "%" : "0%"}
      100%;
    background-repeat: no-repeat;
    border-radius: 25px 0 0 25px;
    transition: width 0.5s ease-in-out;

    span {
      text-align: center;
      padding: 10px;
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
