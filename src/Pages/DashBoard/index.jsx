
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DashBoard() {
  return (
    <Container>
      <Headerlogo>
        <h2>MathGames</h2>
        <FaGamepad className="gamepadIco" />
      </Headerlogo>

      <GamesContainer>
        <Game
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="aditionlevels">
            <span>➕ ADIÇÃO</span>
          </Link>
        </Game>

        <Game
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="subtractionlevels">
            <span>➖ SUBTRAÇÃO</span>
          </Link>
        </Game>

        <Game
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/tabuadalevels">
            <span>✖️ TABUADA MULTIPLICAÇÃO</span>
          </Link>
        </Game>

        <Game
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/tabuadatleatoria">
            <span>🎲 TABUADA ALEATÓRIA</span>
          </Link>
        </Game>
      </GamesContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  margin: 0 auto;
  background: linear-gradient(to bottom right, #00202e, #00121f);
  animation: backgroundMove 10s ease infinite;
  background-size: 400% 400%;

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

const Headerlogo = styled.div`
  color: #02b8cc;
   text-shadow: 1px 1px 2px #002b31;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .gamepadIco {
    font-size: 45px;
    transform: rotate(45deg);
    margin-left: 10px;
    
  }

  h2 {
    font-size: 50px;
    font-family: "Baloo 2", cursive;
  }

  padding: 20px 5px;
`;

const GamesContainer = styled.ul`
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  list-style: none;
`;
const Game = styled(motion.li)`
  background: linear-gradient(145deg, #02b8cc, #029bb3);
  border: 4px solid #01a2b0;
  border-radius: 25px;
  margin: 8px 0;
  padding: 25px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, #02b8cc, #029bb3);
  border: 4px solid #01a2b0;
  box-shadow:
    6px 6px 12px rgba(0, 0, 0, 0.4),
    -4px -4px 8px rgba(255, 255, 255, 0.1),
    inset 0 -3px 6px rgba(0, 0, 0, 0.3),
    inset 0 3px 6px rgba(255, 255, 255, 0.05);

  a {
    text-decoration: none;
  }

  span {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 500px) {
    padding: 20px 15px;
    span {
      font-size: 25px;
    }
  }

  &:hover {
    transform: scale(1.05) rotate(-1deg);
    background: linear-gradient(145deg, #02d0e8, #0290a9);
    box-shadow:
      8px 8px 16px rgba(0, 0, 0, 0.5),
      -4px -4px 8px rgba(255, 255, 255, 0.1),
      inset 0 -3px 6px rgba(0, 0, 0, 0.2),
      inset 0 3px 6px rgba(255, 255, 255, 0.07);
    border-color: #00dfff;
  }

  &:active {
    transform: scale(0.97);
    background: linear-gradient(to bottom, #02aecc, #017c94);
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5),
                inset 0 -3px 6px rgba(255, 255, 255, 0.05);
  }
`;

