import React, { useEffect } from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import NivelBarComponent from "../../components/NivelBarComponent";
import IslandsPhasesGenerator from "../../components/AditionComponents/IslandsPhasesGenerator";
import { AppContext } from "../../Contexts/AppContext";

export default function AditionLevels() {
  const phasesArray = Array.from({ length: 10 }, (_, index) => index);
  const [phases, setPhases] = useState(phasesArray);
  const { AditionphasesList, setAditionphasesList } = useContext(AppContext);

  const aditionphasesList = [
    { phase: "1", minRange: 1, maxRange: 10 },
    { phase: "2", minRange: 1, maxRange: 15 },
    { phase: "3", minRange: 1, maxRange: 20 },
    { phase: "4", minRange: 1, maxRange: 25 },
    { phase: "5", minRange: 1, maxRange: 30 },
    { phase: "6", minRange: 1, maxRange: 35 },
    { phase: "7", minRange: 1, maxRange: 40 },
    { phase: "8", minRange: 1, maxRange: 45 },
    { phase: "9", minRange: 1, maxRange: 50 },
    { phase: "10", minRange: 1, maxRange: 55 },
    { phase: "11", minRange: 1, maxRange: 60 },
    { phase: "12", minRange: 1, maxRange: 65 },
  ];

  useEffect(() => {
    setAditionphasesList(aditionphasesList);
  }, []);

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
        AditionphasesList={AditionphasesList}
        calculateMarginLeft={calculateMarginLeft}
        bgColor="#58cc02"
        borderColor="#46a302"
        phaseCompletes={[0, 1, 2]}
      />
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
