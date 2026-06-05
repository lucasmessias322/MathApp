/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import IslandsPhasesGenerator from "../../components/AditAndSubtrComponents/IslandsPhasesGenerator";
import { AppContext } from "../../Contexts/AppContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
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
      <Header bg="Transparent">
        <ReturnArrow>
          <Link to="/">
            <MdArrowBackIosNew />
          </Link>
        </ReturnArrow>
      </Header>

      <MainContainer>
        <StageIntro
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <small>Mapa de aventura</small>
          <h1>Escolha a proxima fase</h1>
          <p>Siga o caminho, desbloqueie ilhas e avance ate a bandeira final.</p>
          <IntroBadge>
            <FaFlagCheckered />
            Cada fase vencida libera a proxima
          </IntroBadge>
        </StageIntro>

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
  min-height: 100vh;
  background:
    radial-gradient(circle at top center, rgba(88, 196, 255, 0.12), transparent 18%),
    radial-gradient(circle at 15% 22%, rgba(255, 98, 130, 0.08), transparent 22%),
    radial-gradient(circle at 85% 18%, rgba(126, 123, 255, 0.1), transparent 20%),
    linear-gradient(180deg, #07131f 0%, #0e2235 46%, #0a1826 100%);
  display: flex;
  flex-direction: column;
`;

const ReturnArrow = styled.div`
  border-radius: 50%;
  background: linear-gradient(180deg, #7bdcff 0%, #4a9dff 60%, #6b6dff 100%);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 20px rgba(37, 94, 206, 0.24);

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
    background: linear-gradient(180deg, #8be0ff 0%, #5aa9ff 60%, #7b7cff 100%);
  }
`;

const MainContainer = styled.div`
  max-width: 600px;
  margin: 128px auto 0;
  padding: 0 18px 100px;
  z-index: 1;
`;

const StageIntro = styled(motion.div)`
  margin: 0 auto 18px;
  padding: 24px 22px 20px;
  border-radius: 30px;
  background:
    radial-gradient(circle at top right, rgba(255, 98, 130, 0.12), transparent 32%),
    linear-gradient(135deg, rgba(14, 29, 46, 0.9) 0%, rgba(15, 30, 54, 0.88) 55%, rgba(27, 35, 76, 0.9) 100%);
  border: 1px solid rgba(123, 201, 255, 0.22);
  backdrop-filter: blur(14px);
  text-align: center;
  color: #fff;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.3);

  small {
    display: inline-flex;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(60, 157, 255, 0.95), rgba(123, 124, 255, 0.95));
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  h1 {
    margin-top: 10px;
    font-size: clamp(2.1rem, 5vw, 2.8rem);
    line-height: 0.95;
    text-shadow: 0 4px 0 rgba(24, 42, 89, 0.45);
  }

  p {
    margin-top: 8px;
    font-size: 1.03rem;
    font-weight: 700;
    color: rgba(241, 248, 255, 0.92);
  }
`;

const IntroBadge = styled.div`
  width: fit-content;
  margin: 16px auto 0;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.94rem;
  font-weight: 800;
`;
