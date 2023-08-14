import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function DashBoard() {
  const [levels, setLevels] = useState(numerosArray);

  return (
    <Container>
      <h2>Aprender Taboada</h2>
      <LevelContainer>
        {levels?.map((elem, i) => (
          <Level key={i}>
            <Link to={`/TaboadaCompleta/${elem}`}>
              <span>{elem}</span>
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
    font-size: 30px;
    text-align: center;
  }
`;

const LevelContainer = styled.ul`
  width: 100%;
  /* max-width: 300px; */
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

    width: 50px;
    height: 40px;
    padding: 20px;

    margin: 5px;
    background-color: #006eff;
    color: white;
    font-size: 25px;
    border-radius: 10px;
    border: 4px solid #006eff;

    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: #343541;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;
