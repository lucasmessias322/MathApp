import { useState, useEffect } from "react";
import styled from "styled-components";
import { VscBook } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function IslandsPhasesGenerator({
  phasesList,
  calculateMarginLeft,
  gameUrlPath,
}) {
  // Passo 1: Inicialize a variável para rastrear a última fase completa
  let lastReleasedPhase = -1;

  // Passo 2: Encontre a última fase completa
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
          style={{ marginLeft: `${calculateMarginLeft(index)}px` }}
          bgcolor={item.releasedPhase ? item.bgColor : ""}
          bordercolor={item.releasedPhase ? item.borderColor : ""}
          animationname={lastReleasedPhase == index ? `upDownanimation` : ""}
        >
          <Link to={item.releasedPhase ? `${gameUrlPath}/${item.phase}` : ""}>
            <VscBook />
          </Link>
        </PhaseItem>
      ))}
    </PhasesContainer>
  );
}

const PhasesContainer = styled.div`
  padding: 10px 30px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Alinhar os itens no topo */
  align-items: center;
  margin: 0px 0px;

`;

const PhaseItem = styled.button`
  border: none;
  outline: none;
  width: 100px;
  height: 50px;
  margin: 20px 10px;
  border-radius: 50%;
  border-bottom: 10px solid
    ${(props) => (props.bordercolor ? "#015f85" : "#333333")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.bgcolor ? "#00b7ff " : "#474747")};
  opacity: ${(props) => (props.bgcolor ? 1 : 0.4)};

  padding-top: 15px;
  animation-name: ${(props) => props.animationname && props.animationname};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: forwards;
  position: relative;

  a {
    width: 100%;
    text-align: center;
    color:#ffffff;

    font-size: 35px;

    position: relative;
  }

  @keyframes upDownanimation {
    0%,
    100% {
      bottom: 0;
    }
    50% {
      bottom: 5px;
    }
  }
`;
