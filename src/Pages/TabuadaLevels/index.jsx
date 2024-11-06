import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import NivelBarComponent from "../../components/NivelBarComponent";
import * as C from "./style";
import { AppContext } from "../../Contexts/AppContext";

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
        stars.push(<FaStar key={i} color="#ffd900" />);
      } else {
        stars.push(<FaStar key={i} color="#0044C6" />);
      }
    }

    return stars;
  }

  return (
    <C.Container>
      <NivelBarComponent />
      <C.ReturnArrow>
        <Link to="/">
          <MdArrowBackIosNew />
        </Link>
      </C.ReturnArrow>
      <br />
      <C.LevelContainer>
        {levels?.map((elem, i) => (
          <C.Level key={i}>
            <Link to={`/TaboadaCompleta/${elem}`}>
              <span>{elem}</span>
              <div className="stars">{renderStars(elem)}</div>
            </Link>
          </C.Level>
        ))}
      </C.LevelContainer>
    </C.Container>
  );
}
