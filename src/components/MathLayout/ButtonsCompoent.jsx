import React from "react";
import styled from "styled-components";

export default function ButtonsCompoent({ handleButtonClicked }) {
  return (
    <ButtonsContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
        <Button key={value} onClick={() => handleButtonClicked(value)}>
          {value}
        </Button>
      ))}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

const Button = styled.button`
  width: 90px;
  height: 90px;
  font-size: 40px;
  font-weight: bold;

  color: #fffffff0;
  background: linear-gradient(145deg, #02b8cc, #029bb3);
  border-radius: 18px;
  border: 4px solid #01a2b0;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.4),
    -4px -4px 8px rgba(255, 255, 255, 0.1), inset 0 -3px 6px rgba(0, 0, 0, 0.3),
    inset 0 3px 6px rgba(255, 255, 255, 0.05);
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease-in-out;

  &:active {
    transform: scale(0.97);
    background: linear-gradient(to bottom, #02aecc, #017c94);
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.5),
      inset 0 -3px 6px rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 500px) {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }
`;
