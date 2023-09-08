import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function DashBoard() {
  const [levels, setLevels] = useState(numerosArray);

  return (
    <Container>
      <h2>Aprenda Taboada</h2>
      <LevelContainer>
        {levels?.map((elem, i) => (
          <Level key={i}>
            <Link to={`#/TaboadaCompleta/${elem}`}>
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
    font-size: 35px;
    padding: 20px;
    text-align: center;
  }
`;

const LevelContainer = styled.ul`
  width: 100%;
  max-width: 500px;
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

    width: 100px;
    height: 100px;
    padding: 20px;

    margin: 5px;
    background: linear-gradient(to bottom, #006eff, #0059ce);
    color: white;
    font-size: 35px;
    font-weight: bold;
    border-radius: 10px;
    border-bottom: 5px solid #174a8d;

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
