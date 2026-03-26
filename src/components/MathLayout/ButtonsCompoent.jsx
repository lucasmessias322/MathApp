/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { FaCheck, FaBackspace } from "react-icons/fa";

const buttonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="];

export default function ButtonsCompoent({ handleButtonClicked }) {
  return (
    <ButtonsContainer>
      {buttonItems.map((value) => {
        const isClear = value === "C";
        const isConfirm = value === "=";

        return (
          <Button
            key={value}
            type="button"
            $variant={isConfirm ? "confirm" : isClear ? "clear" : "number"}
            onClick={() => handleButtonClicked(value)}
          >
            <ButtonInner>
              <ButtonGlow />
              <ButtonLabel>
                {isClear ? <FaBackspace /> : isConfirm ? <FaCheck /> : value}
              </ButtonLabel>
              <ButtonShadow />
            </ButtonInner>
          </Button>
        );
      })}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(86px, 1fr));
  gap: 12px;
  margin: 4px auto 0;
  padding: 0;
  list-style: none;

  @media (max-width: 500px) {
    gap: 10px;
  }
`;

const numberVariant = css`
  background: linear-gradient(180deg, #78deff 0%, #4d9fff 52%, #6468ff 100%);
  //box-shadow: 0 16px 0 #274f94, 0 22px 30px rgba(24, 59, 117, 0.28);
`;

const clearVariant = css`
  background: linear-gradient(180deg, #ffb68d 0%, #ff7d7b 55%, #ff5f91 100%);
 // box-shadow: 0 16px 0 #a8465f, 0 22px 30px rgba(153, 55, 88, 0.3);
`;

const confirmVariant = css`
  background: linear-gradient(180deg, #92f0ff 0%, #45cbff 45%, #4e7dff 100%);
 // box-shadow: 0 16px 0 #25589d, 0 22px 30px rgba(31, 91, 176, 0.32);
`;

const Button = styled.button`
  width: 100%;
  min-height: 86px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  user-select: none;
  transition: transform 0.14s ease, filter 0.14s ease;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    props.$variant === "confirm"
      ? confirmVariant
      : props.$variant === "clear"
        ? clearVariant
        : numberVariant}

  border-radius: 26px;
  position: relative;
  overflow: visible;

  &:hover {
    transform: translateY(-2px) scale(1.01);
    filter: saturate(1.05) brightness(1.03);
  }

  &:active {
    transform: translateY(10px) scale(0.98);
    box-shadow: 0 6px 0
        ${(props) =>
          props.$variant === "confirm"
            ? "#25589d"
            : props.$variant === "clear"
              ? "#a8465f"
              : "#274f94"},
      0 10px 16px
        ${(props) =>
          props.$variant === "confirm"
            ? "rgba(31, 91, 176, 0.24)"
            : props.$variant === "clear"
              ? "rgba(153, 55, 88, 0.22)"
              : "rgba(24, 59, 117, 0.22)"};
  }

  @media (max-width: 500px) {
    min-height: 92px;
    border-radius: 24px;
  }
`;

const ButtonInner = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 86px;
  border-radius: inherit;
  border: 2px solid rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: inherit;

  @media (max-width: 500px) {
    min-height: 92px;
  }
`;

const ButtonGlow = styled.span`
  position: absolute;
  inset: 6px 10px auto;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.42),
    rgba(255, 255, 255, 0)
  );
  pointer-events: none;
`;

const ButtonShadow = styled.span`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 8px;
  height: 10px;
  border-radius: 999px;
  background: rgba(12, 26, 48, 0.16);
  filter: blur(4px);
  pointer-events: none;
`;

const ButtonLabel = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 900;
  text-shadow: 0 3px 0 rgba(24, 48, 94, 0.24);

  svg {
    font-size: 1.8rem;
    filter: drop-shadow(0 3px 0 rgba(24, 48, 94, 0.2));
  }

  @media (max-width: 500px) {
    font-size: 2.15rem;

    svg {
      font-size: 1.95rem;
    }
  }
`;
