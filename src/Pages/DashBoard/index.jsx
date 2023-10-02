import React,{useContext} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";
export default function DashBoard() {
  const navigateTo = useNavigate;
  const {} = useContext(AppContext)

 
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
          <span>SUBTRAÇÂO</span>
        </Game>
        <Game>
          <Link to="/tabuadalevels">
            <span>TABOADA DE MUTIPLICAÇÂO</span>
          </Link>
        </Game>
      </GamesContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;

  h2 {
    font-size: 35px;
    color: #014ad8;
    padding: 20px 10px;
    text-align: center;
  }
`;

const GamesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
  padding: 20px;

  span {
    color: white;
    font-weight: bold;
    font-size: 17px;
  }
`;
