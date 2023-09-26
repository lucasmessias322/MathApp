import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import * as C from "./style";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function TabuadaLevels() {
  const [levels, setLevels] = useState(numerosArray);
  const totalPoints = Number(localStorage.getItem("points"));

  // Calcula o nível atual com base nos pontos
  const currentLevel = Math.floor(totalPoints / 500);

  // Calcula a largura da barra de nível
  const fillWidth = ((totalPoints % 500) / 500) * 100;

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
      <C.NivelsBarContainer>
        <C.NivelBar fillWidth={fillWidth}>
          <div className="fillnivelbar">
            <span>Nível {currentLevel}</span>
          </div>
        </C.NivelBar>
      </C.NivelsBarContainer>
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
