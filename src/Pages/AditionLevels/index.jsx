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
    {
      phase: "1",
      minRange: 1,
      maxRange: 10,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "2",
      minRange: 1,
      maxRange: 15,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "3",
      minRange: 1,
      maxRange: 20,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "4",
      minRange: 1,
      maxRange: 25,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "5",
      minRange: 1,
      maxRange: 30,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "6",
      minRange: 1,
      maxRange: 35,
      bgColor: "#58cc02",
      borderColor: "#46a302",
      wasComplete: false,
    },
    {
      phase: "7",
      minRange: 10,
      maxRange: 40,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
    {
      phase: "8",
      minRange: 10,
      maxRange: 45,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
    {
      phase: "9",
      minRange: 10,
      maxRange: 50,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
    {
      phase: "10",
      minRange: 10,
      maxRange: 55,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
    {
      phase: "11",
      minRange: 10,
      maxRange: 60,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
    {
      phase: "12",
      minRange: 10,
      maxRange: 65,
      bgColor: "#b402cc",
      borderColor: "#9002a3",
      wasComplete: false,
    },
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
