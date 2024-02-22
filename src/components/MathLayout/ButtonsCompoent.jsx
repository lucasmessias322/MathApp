import React from "react";
import styled from "styled-components";

export default function ButtonsCompoent({ handleButtonClicked }) {
  return (
    <ButtonsContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
        <Buttons key={value} onClick={() => handleButtonClicked(value)}>
          {value}
        </Buttons>
      ))}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.ul`
  width: 100%;
  max-width: 240px; /* Aumente a largura máxima para caber 3 botões por linha em dispositivos móveis */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas por linha */
  grid-column-gap: 0px; /* Espaçamento entre as colunas verticais dos botões */
  grid-row-gap: 0px; /* Espaçamento entre as linhas dos botões */
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 15px auto;

  @media (max-width: 500px) {
    max-width: 240px; /* Aumente a largura máxima para telas maiores, se necessário */
  }
`;

const Buttons = styled.button`
  outline: none;
  border: none;
  height: 90px;
  width: 90px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom right, #006eff, #024194);
  /* box-shadow: 0px 5px 5px 0px #001736; */
  border-radius: 20px;
  user-select: none;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.95);
    box-shadow: 0px 10px 10px 0px #001736 inset;
  }

  @media (min-width: 500px) {
    height: 80px;
    width: 80px;
    font-size: 30px;
  }

  @media (max-width: 300px) {
    height: 70px;
    width: 70px;
    font-size: 30px;
  }
`;
