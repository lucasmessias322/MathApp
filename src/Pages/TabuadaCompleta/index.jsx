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
      <h2>Level {tabuNumber}</h2>
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
  color: white;
  height: 100vh;

  h2 {
    color: #0471ff;
    font-size: 35px;
    padding: 20px;
    text-align: center;
  }

  ul {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    padding: 10px;
    margin: 0 auto;

    li {
      padding: 5px;
      font-size: 30px;
    }
  }
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
    background: linear-gradient(179deg, #014ad8 1.22%, #002466 98.84%);
    box-shadow: 5px 5px 4px 0px #010b1f;

    &:active {
      transform: scale(0.95);
      box-shadow: 5px 5px 4px 0px #010b1f inset;
    }
  }
`;
