import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function DashBoard() {
  const [levels, setLevels] = useState(numerosArray);

  // Função para criar as estrelas com base no recorde
  function renderStars(level) {
    const stars = [];
    const record = localStorage.getItem(`record_${level}`);

    for (let i = 0; i < 5; i++) {
      const starColor = record >= (i + 1) * 100 ? "#ffd900" : "#0044C6";
      stars.push(<AiTwotoneStar key={i} color={starColor} />);
    }

    return stars;
  }

  return (
    <Container>
      <h2>Aprenda Taboada</h2>
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
