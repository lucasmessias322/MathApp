import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export default function AditionGame() {
  const phasesArray = Array.from({ length: 5 }, (_, index) => index);
  const [phases, setPhases] = useState(phasesArray);

  function calculateMarginLeft(index) {
    // Calcule a margem esquerda com base na função seno
    const amplitude = 150; // Ajuste conforme desejado
    const frequency = 5; // A cada 5 items
    const marginLeft = amplitude * Math.sin((2 * Math.PI * index) / frequency);

    return marginLeft;
  }

  // Função para criar as estrelas com base no recorde
  function renderStars(level) {
    const stars = [];
    const starsEarned = 1;

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
    <Container>
      <IslandsPhasesGenerator
        phases={phases}
        calculateMarginLeft={calculateMarginLeft}
        bgImage="/assets/Terrestrial400.png"
      />
      <IslandsPhasesGenerator
        phases={phases}
        calculateMarginLeft={calculateMarginLeft}
        bgImage="/assets/mars.png"
      />

      <IslandsPhasesGenerator
        phases={phases}
        calculateMarginLeft={calculateMarginLeft}
        bgImage="/assets/jupiter.png"
      />
    </Container>
  );
}

function IslandsPhasesGenerator({ phases, calculateMarginLeft, bgImage }) {
  return (
    <PhasesContainer>
      {phases.map((_, index) => (
        <PhaseItem
          key={index}
          style={{ marginLeft: `${calculateMarginLeft(index)}px` }}
          bgImage={bgImage}
        >
          <span>
            <AiTwotoneStar color="#ffd900" />
            <AiTwotoneStar color="#ffd900" />
            <AiTwotoneStar color="#383846" />
            <AiTwotoneStar color="#383846" />
            <AiTwotoneStar color="#383846" />
          </span>
        </PhaseItem>
      ))}
    </PhasesContainer>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  h2 {
    color: #006eff;
    padding: 20px 10px;
    font-size: 35px;
    text-align: center;
  }
`;
const PhasesContainer = styled.div`
  padding: 10px 30px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Alinhar os itens no topo */
  align-items: center;
  margin: 0px 0px;
  background-image: url("/assets/stars-28.png");
  background-size: contain;
  background-position: center;
`;

const PhaseItem = styled.button`
  border: none;
  outline: none;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => (props.bgImage ? props.bgImage : "")});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  background-position: center;
  margin: 20px 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    width: 100%;
    text-align: center;
    position: relative;
    top: -60px;
    /* background-color: #fff; */
    color: white;
    font-size: 10px;
  }
`;
