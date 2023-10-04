import { useState, useEffect } from "react";
import styled from "styled-components";
import { VscBook } from "react-icons/vsc";
import { Link } from "react-router-dom";

export default function IslandsPhasesGenerator({
  phases,
  calculateMarginLeft,
  bgColor,
  borderColor,
  phaseCompletes,
}) {
  function bgC(phase, ColorFor, phaseCompletes) {
    if (phaseCompletes.includes(phase)) {
      if (ColorFor == "bgColor") {
        if (phase <= 4) {
          return "#58cc02";
        } else if (phase >= 4 && phase <= 10) {
          return "#b402cc";
        }
      } else if (ColorFor == "borderColor") {
        if (phase <= 4) {
          return "#46a302";
        } else if (phase >= 4 && phase <= 10) {
          return "#9002a3";
        }
      }
    }
  }

  function handleDificult(phase) {
    if (phase <= 4) {
      return 1;
    } else if (phase >= 4 && phase <= 10) {
      return 2;
    } else if (phase >= 10 && phase <= 15) {
      return 3;
    } else if (phase >= 15 && phase <= 20) {
      return 4;
    }
  }

  return (
    <PhasesContainer>
      {phases.map((phase, index) => (
        <PhaseItem
          key={index}
          style={{ marginLeft: `${calculateMarginLeft(index)}px` }}
          bgColor={bgC(phase, "bgColor", phaseCompletes)}
          borderColor={bgC(phase, "borderColor", phaseCompletes)}
        >
          <Link to={`/aditiongame/${phase}/${handleDificult(phase)}`}>
            <VscBook />
          </Link>
        </PhaseItem>
      ))}
    </PhasesContainer>
  );
}

const PhasesContainer = styled.div`
  padding: 10px 30px;
  max-width: 400px;
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
    ${(props) => (props.borderColor ? props.borderColor : "darkgray")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "gray")};
  padding-top: 15px;
  /* animation-name: upDownanimation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 20s; */
  position: relative;

  a {
    width: 100%;
    text-align: center;
    color: #e7e7e7d5;
    font-size: 35px;

    position: relative;
  }

  @keyframes upDownanimation {
    0%,
    100% {
      bottom: 0;
    }
    50% {
      bottom: 10px;
    }
  }
`;
