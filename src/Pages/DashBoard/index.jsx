import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";

export default function DashBoard() {
  return (
    <Container>
      <Headerlogo>
        <h2>MathGames</h2>
        <FaGamepad className="gamepadIco" />
      </Headerlogo>

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
            <span>TABOADA MUTIPLICAÇÂO</span>
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
`;

const Headerlogo = styled.div`
  color: #014ad8;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  .gamepadIco {
    font-size: 45px;
    transform: rotate(45deg);
  }
  h2 {
    font-size: 45px;
  }
  padding: 20px 5px;
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
  margin-top: 2px;
  width: 100%;
  background-color: #212433;
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
