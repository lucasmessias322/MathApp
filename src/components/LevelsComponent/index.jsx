import React, { useEffect } from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import NivelBarComponent from "../../components/NivelBarComponent";
import IslandsPhasesGenerator from "../../components/AditAndSubtrComponents/IslandsPhasesGenerator";
import { AppContext } from "../../Contexts/AppContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";

export default function LevelsComponent({
  gameUrlPath,
  phasesListName,
  phasesList,
}) {
  const { getLocalStorageValue, setLocalStorageValue } = useContext(AppContext);
  const phasesListListFromStorage = JSON.parse(
    getLocalStorageValue(phasesListName)
  );
  const [newphasesList, setNewphasesList] = useState([]);

  useEffect(() => {
    if (!phasesListListFromStorage) {
      setLocalStorageValue(phasesListName, JSON.stringify(phasesList));
      setNewphasesList(phasesList);
    } else {
      setNewphasesList(phasesListListFromStorage);
    }
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
      <ReturnArrow>
        <Link to="/">
          <MdArrowBackIosNew />
        </Link>
      </ReturnArrow>
      <br />
      <br />
      <br />
      <br />
      <br />
      <IslandsPhasesGenerator
        phasesList={newphasesList}
        calculateMarginLeft={calculateMarginLeft}
        gameUrlPath={gameUrlPath}
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

const ReturnArrow = styled.div`
  padding: 5px;
  font-size: 40px;
  color: #0059ff;
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 9999;
  top: 100px;
`;
