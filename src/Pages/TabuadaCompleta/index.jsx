import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function TaboadaCompleta() {
  const { tabuada } = useParams();
  const tabuNumber = parseInt(tabuada);
  const [table, setTable] = useState([]);

  useEffect(() => {
    generateTable();
  }, [tabuNumber]);

  const generateTable = () => {
    const newTable = [];
    for (let i = 1; i <= 10; i++) {
      newTable.push({ num: i, result: i * tabuNumber });
    }
    setTable(newTable);
  };

  return (
    <Container>
      <Title>Tabuada do {tabuNumber}</Title>
      <ul>
        {table.map((item) => (
          <li key={item.num}>
            {tabuNumber} x {item.num} = {item.result}
          </li>
        ))}
      </ul>
      <StartGameContainer>
        <Link to={`/TabuadaGame/${tabuNumber}`}>
          <FaPlay size={35} />
        </Link>
      </StartGameContainer>
    </Container>
  );
}

const Container = styled.div`
  color: #02aecc;
  width: 100%;
  height: 100vh;
  padding: 10px 20px;
  background: #001623;

  ul {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style: none;

    li {
      padding: 5px;
      font-size: 30px;
    }
  }
`;

const Title = styled.h2`
  font-size: 38px;
  color: #02aecc;
  padding-bottom: 20px;

  font-family: "Fredoka One", "Comic Sans MS", cursive;
  text-shadow: 2px 2px #56d4eb;
`;
const StartGameContainer = styled.div`
  width: 100%;
  padding-bottom: 70px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;

  a {
    outline: none;
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
    border-radius: 100%;
    background: linear-gradient(145deg, #02b8cc, #029bb3);

    border: 4px solid #01a2b0;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.4),
      -4px -4px 8px rgba(255, 255, 255, 0.1),
      inset 0 -3px 6px rgba(0, 0, 0, 0.3),
      inset 0 3px 6px rgba(255, 255, 255, 0.05);

    &:active {
      transform: scale(0.95);
      background: linear-gradient(to bottom, #02aecc, #017c94);
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5),
        inset 0 -3px 6px rgba(255, 255, 255, 0.05);
    }
  }
`;
