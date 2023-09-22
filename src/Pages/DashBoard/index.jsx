import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function DashBoard() {
  const [levels, setLevels] = useState(numerosArray);
  const totalPoints = Number(localStorage.getItem("points"));

  // Calcula o nível atual com base nos pontos
  const currentLevel = Math.floor(totalPoints / 500);

  // Calcula a largura da barra de nível
  const fillWidth = ((totalPoints % 500) / 500) * 100;

  // Função para criar as estrelas com base no recorde
  function renderStars(level) {
    const stars = [];
    const record = localStorage.getItem(`record_${level}`);
    const starsEarned = localStorage.getItem(`stars_${level}`);

    for (let i = 0; i < 5; i++) {
      if (i < starsEarned) {
        stars.push(<AiTwotoneStar key={i} color="#ffd900" />);
      } else {
        stars.push(<AiOutlineStar key={i} color="#0044C6" />);
      }
    }

    return stars;
  }

  return (
    <Container>
      {/* <h2>Aprenda Taboada</h2> */}
      {/* <NivelsBarContainer>
        <NivelBar>
          <div className="fillnivelbar" style={{ width: "20%" }}>
            <span>0</span>
          </div>
        </NivelBar>
      </NivelsBarContainer> */}
      <NivelsBarContainer>
        <NivelBar>
          <div className="fillnivelbar" style={{ width: `${fillWidth}%` }}>
            <span>Nível {currentLevel}</span>
          </div>
        </NivelBar>
      </NivelsBarContainer>
      <LevelContainer>
        {levels?.map((elem, i) => (
          <Level key={i}>
            <Link to={`/TaboadaCompleta/${elem}`}>
              <span>{elem}</span>
              <div className="stars">{renderStars(elem)}</div>
              {/* Exibe as estrelas */}
            </Link>
          </Level>
        ))}
      </LevelContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  h2 {
    width: 100%;
    color: #0471ff;
    font-size: 35px;
    padding: 20px;
    text-align: center;
  }
`;

const LevelContainer = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
`;

const Level = styled.li`
  list-style: none;
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100px;
    height: 100px;
    padding: 20px;

    margin: 5px;
    /* background: linear-gradient(to bottom, #006eff, #0059ce); */
    background: linear-gradient(179deg, #014ad8 1.22%, #002466 98.84%);
    box-shadow: 5px 5px 4px 0px #010b1f;
    color: white;
    font-size: 30px;
    font-weight: bold;
    border-radius: 20px;

    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: #343541;
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 5px 5px 4px 0px #010b1f inset;
    }

    div.stars {
      display: flex;
      font-size: 12px;
      padding: 5px 0px;
    }
  }
`;

const NivelsBarContainer = styled.div`
  width: 100%;
  background-color: #19191f;

  /* border-bottom: 1px solid rgba(0, 0, 0, 0.25); */
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NivelBar = styled.div`
  width: 100%;
  height: 20px;
  background: #121216;

  border-radius: 20px;

  .fillnivelbar {
    /* width: 50%; */
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #032b9a;
    border-radius: 20px 0 0 20px;
    transition: width 0.5s ease-in-out;

    span {
      position: absolute;

      left: 50%;
      color: white;
      font-size: 15px;
      font-weight: bold;
    }
  }
`;
