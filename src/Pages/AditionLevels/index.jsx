import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import NivelBarComponent from "../../components/NivelBarComponent";
import IslandsPhasesGenerator from "../../components/AditionComponents/IslandsPhasesGenerator";

export default function AditionLevels() {
  const phasesArray = Array.from({ length: 10 }, (_, index) => index);
  const [phases, setPhases] = useState(phasesArray);

  function calculateMarginLeft(index) {
    // Calcule a margem esquerda com base na função seno
    const amplitude = 150; // Ajuste conforme desejado
    const frequency = 5; // A cada 5 items
    const marginLeft = amplitude * Math.sin((2 * Math.PI * index) / frequency);

    return marginLeft;
  }

  return (
    <Container>
      <NivelBarComponent />
      <br />
      <br />
      <br />
      <br />
      <br />
      <IslandsPhasesGenerator
        phases={phases}
        calculateMarginLeft={calculateMarginLeft}
        bgColor="#58cc02"
        borderColor="#46a302"
        phaseCompletes={[0, 1, 2]}
      />
      {/* <IslandsPhasesGenerator
        phases={phases}
        calculateMarginLeft={calculateMarginLeft}
        bgColor="#b402cc"
        borderColor="#9002a3"
        phaseCompletes={[1, 2]}
      /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  h2 {
    color: #006eff;
    padding: 20px 10px;
    font-size: 35px;
    text-align: center;
  }
`;
