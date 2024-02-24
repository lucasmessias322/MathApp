import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function DashBoard() {
  return (
    <Container>
      <h2>MathGames</h2>
      <GamesContainer>
        <Game>
          <Link to="aditionlevels">
            <span>ADIÇÂO</span>
          </Link>
        </Game>
        <Game>
          <Link to="subtractionlevels">
            <span>SUBITRAÇÂO</span>
          </Link>
        </Game>
        <Game>
          <Link to="/tabuadalevels">
            <span>TABOADA DE MUTIPLICAÇÂO</span>
          </Link>
        </Game>
        <Game>
          <Link to="/tabuadatleatoria">
            <span>TABOADA ALEATÓRIA</span>
          </Link>
        </Game>
      </GamesContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;

  h2 {
    font-size: 45px;
    color: #014ad8;
    padding: 20px 5px;
    text-align: center;
  }
`;

const GamesContainer = styled.ul`
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Game = styled.li`
  user-select: none;
  width: 100%;
  list-style: none;
  margin: 5px;
  width: 100%;
  background-color: #23232b;
  border-radius: 10px;
  text-align: center;
  padding: 22px 5px;

  span {
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  &:hover {
    background-color: #01317f;
    box-shadow: 0 4px 9px rgba(1, 74, 216, 0.2);
  }
`;
