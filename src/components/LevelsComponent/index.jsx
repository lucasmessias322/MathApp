import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import NivelBarComponent from "../../components/NivelBarComponent";
import IslandsPhasesGenerator from "../../components/AditAndSubtrComponents/IslandsPhasesGenerator";
import { AppContext } from "../../Contexts/AppContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../Header";

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
    const amplitude = 150;
    const frequency = 5;
    return amplitude * Math.sin((2 * Math.PI * index) / frequency);
  }

  return (
    <Container>
      <Header bg="#001623">
        <ReturnArrow>
          <Link to="/">
            <MdArrowBackIosNew />
          </Link>
        </ReturnArrow>
        <NivelBarComponent />
      </Header>

      <MainContainer>
        <IslandsPhasesGenerator
          phasesList={newphasesList}
          calculateMarginLeft={calculateMarginLeft}
          gameUrlPath={gameUrlPath}
        />
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #001623;
  background-size: 400% 400%;
  animation: backgroundMove 15s ease infinite;
  display: flex;
  flex-direction: column;

  @keyframes backgroundMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ReturnArrow = styled.div`
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  color: #fff;
  a {
    transition: 0.3s;
    font-weight: bold;

    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const MainContainer = styled.div`
  max-width: 600px;
  margin: 140px auto 0 auto;
  padding-bottom: 100px;
  z-index: 1;
`;
