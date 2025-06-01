import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import NivelBarComponent from "../../components/NivelBarComponent";
import styled from "styled-components";
import { AppContext } from "../../Contexts/AppContext";
import Header from "../../components/Header";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function TabuadaLevels() {
  const { getLocalStorageValue } = useContext(AppContext);
  const levels = numerosArray;

  // Função para criar as estrelas com base no recorde
  function renderStars(level) {
    const stars = [];
    const starsEarned = getLocalStorageValue(`stars_${level}`);

    for (let i = 0; i < 5; i++) {
      if (i < starsEarned) {
        stars.push(<FaStar key={i} color=" #ffc516;" />);
      } else {
        stars.push(<FaStar key={i} color="#5a5a5a83" />);
      }
    }

    return stars;
  }

  return (
    <Container>
      <Header bg="Transparent">
        <ReturnArrow>
          <Link to="/">
            <MdArrowBackIosNew />
          </Link>
        </ReturnArrow>
        <NivelBarComponent />
      </Header>

      <br />
      <LevelContainer>
        {levels?.map((elem, i) => (
          <Level key={i}>
            <Link to={`/TaboadaCompleta/${elem}`}>
              <span>{elem}</span>
              <div className="stars">{renderStars(elem)}</div>
            </Link>
          </Level>
        ))}
      </LevelContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: linear-gradient(to bottom right, #00202e, #00121f);
  overflow-y: auto;
  padding-bottom: 30px;
`;

const LevelContainer = styled.ul`
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 120px 10px 30px 10px;
  gap: 15px;
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

    width: 110px;
    height: 110px;
    background: linear-gradient(145deg, #02b8cc, #029bb3);
    border: 4px solid #01a2b0;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.4),
      -4px -4px 8px rgba(255, 255, 255, 0.1),
      inset 0 -3px 6px rgba(0, 0, 0, 0.3),
      inset 0 3px 6px rgba(255, 255, 255, 0.05);
    border-radius: 25px;

    font-size: 36px;
    font-weight: bold;

    color: white;

    cursor: pointer;
    transition: all 0.2s ease;

    span {
      margin-bottom: 6px;
    }

    .stars {
      display: flex;
      justify-content: center;
      font-size: 16px;
      color: #ffbf00;
    }

    &:hover {
      transform: scale(1.05);
      background: linear-gradient(145deg, #02d0e8, #0290a9);
      box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.5),
        -4px -4px 8px rgba(255, 255, 255, 0.1),
        inset 0 -3px 6px rgba(0, 0, 0, 0.2),
        inset 0 3px 6px rgba(255, 255, 255, 0.07);
      border-color: #00dfff;
    }

    &:active {
      transform: scale(0.95);
      background: linear-gradient(to bottom, #02aecc, #017c94);
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5),
        inset 0 -3px 6px rgba(255, 255, 255, 0.05);
    }
  }
`;
const ReturnArrow = styled.div`
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  color: #fff;
  a {
    transition: 0.3s;
    font-weight: bold;

    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
