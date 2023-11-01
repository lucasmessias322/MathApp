import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import NivelBarComponent from "../../components/NivelBarComponent";
import * as C from "./style";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function TabuadaLevels() {
  const [levels, setLevels] = useState(numerosArray);
  const totalPoints = Number(localStorage.getItem("totalPoints"));

  // Função para criar as estrelas com base no recorde
  function renderStars(level) {
    const stars = [];
    const starsEarned = localStorage.getItem(`stars_${level}`);

    for (let i = 0; i < 5; i++) {
      if (i < starsEarned) {
        stars.push(<AiTwotoneStar key={i} color="#ffd900" />);
      } else {
        stars.push(<AiOutlineStar key={i} color="#0044C6" />);
      }
    }

    return stars;
  }

  return (
    <C.Container>
      <NivelBarComponent  />
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
