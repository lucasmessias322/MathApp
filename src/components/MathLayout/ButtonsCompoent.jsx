/* eslint-disable react/prop-types */
import { memo } from "react";
import styled, { css } from "styled-components";
import { FaCheck, FaBackspace } from "react-icons/fa";

const buttonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="];

function ButtonsCompoent({ handleButtonClicked }) {
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

const MemoizedButtonsCompoent = memo(ButtonsCompoent);

export default MemoizedButtonsCompoent;

const ButtonsContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(86px, 1fr));
  gap: 10px;
  margin: 4px auto 0;
  padding: 0;
  list-style: none;

  @media (min-width: 701px) {
    grid-template-columns: repeat(3, minmax(78px, 1fr));
    gap: 12px;
  }

  @media (max-width: 500px) {
    gap: 12px;
  }
`;

const numberVariant = css`
  --key-face-top: #466b8d;
  --key-face-mid: #294862;
  --key-face-bottom: #152c40;
  --key-edge: #0b1d2f;
  --key-edge-dark: #06111d;
  --key-ring: rgba(156, 203, 238, 0.38);
  --key-label: #ffffff;
  --key-label-shadow: rgba(0, 9, 18, 0.5);
  --key-glow: rgba(181, 224, 255, 0.24);
  --key-shadow: rgba(2, 9, 17, 0.48);
`;

const clearVariant = css`
  --key-face-top: #d95c60;
  --key-face-mid: #a53248;
  --key-face-bottom: #6f1f36;
  --key-edge: #4c1728;
  --key-edge-dark: #300d19;
  --key-ring: rgba(255, 185, 187, 0.42);
  --key-label: #ffffff;
  --key-label-shadow: rgba(42, 7, 18, 0.52);
  --key-glow: rgba(255, 190, 190, 0.28);
  --key-shadow: rgba(54, 10, 24, 0.48);
`;

const confirmVariant = css`
  --key-face-top: #39a6d3;
  --key-face-mid: #1f6cb7;
  --key-face-bottom: #18438c;
  --key-edge: #102c62;
  --key-edge-dark: #0a1b3c;
  --key-ring: rgba(164, 232, 255, 0.46);
  --key-label: #ffffff;
  --key-label-shadow: rgba(5, 19, 54, 0.5);
  --key-glow: rgba(161, 232, 255, 0.32);
  --key-shadow: rgba(5, 24, 64, 0.5);
`;

const Button = styled.button`
  width: 100%;
  min-height: 76px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  user-select: none;
  transition: transform 0.12s ease, filter 0.12s ease;
  -webkit-tap-highlight-color: transparent;
  --press-lift: 7px;
  --press-blur: 18px;
  --press-opacity: 0.36;

  ${(props) =>
    props.$variant === "confirm"
      ? confirmVariant
      : props.$variant === "clear"
        ? clearVariant
        : numberVariant}

  border-radius: 18px;
  position: relative;
  overflow: visible;
  filter: drop-shadow(0 10px 13px var(--key-shadow));

  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 12px 16px var(--key-shadow)) saturate(1.04);
  }

  &:active {
    --press-lift: 2px;
    --press-blur: 9px;
    --press-opacity: 0.24;
    transform: translateY(5px) scale(0.992);
    filter: drop-shadow(0 4px 7px var(--key-shadow)) saturate(0.98);
  }

  @media (min-width: 701px) and (max-height: 720px) {
    min-height: 58px;
    border-radius: 10px;
  }

  @media (max-width: 500px) {
    min-height: 92px;
    border-radius: 10px;
    filter: none;
    transition: transform 0.08s ease;

    &:hover {
      transform: none;
      filter: none;
    }

    &:active {
      filter: none;
    }
  }
`;

const ButtonInner = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 76px;
  border-radius: inherit;
  border: 1px solid var(--key-ring);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 0%, var(--key-glow) 0%, transparent 36%),
    linear-gradient(
      180deg,
      var(--key-face-top) 0%,
      var(--key-face-mid) 48%,
      var(--key-face-bottom) 100%
    );
  box-shadow:
    inset 0 2px 0 rgba(255, 255, 255, 0.92),
    inset 0 -5px 10px rgba(35, 48, 68, 0.18),
    0 var(--press-lift) 0 var(--key-edge),
    0 calc(var(--press-lift) + 5px) var(--press-blur)
      rgba(0, 0, 0, var(--press-opacity));
  transition: box-shadow 0.12s ease, filter 0.12s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 4px 6px auto;
    height: 34%;
    border-radius: inherit;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.58),
      rgba(255, 255, 255, 0.06)
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 22%;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.12));
    pointer-events: none;
  }

  @media (min-width: 701px) and (max-height: 720px) {
    min-height: 58px;
  }

  @media (max-width: 500px) {
    min-height: 92px;
    box-shadow:
      inset 0 2px 0 rgba(255, 255, 255, 0.84),
      inset 0 -4px 8px rgba(35, 48, 68, 0.16),
      0 var(--press-lift) 0 var(--key-edge);
    transition: box-shadow 0.08s ease;
  }
`;

const ButtonGlow = styled.span`
  position: absolute;
  inset: 7px 12px auto;
  height: 10px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.64),
    rgba(255, 255, 255, 0.12)
  );
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.22);
  pointer-events: none;
  z-index: 1;

  @media (min-width: 701px) and (max-height: 720px) {
    inset: 6px 10px auto;
    height: 8px;
  }
`;

const ButtonShadow = styled.span`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 9px;
  height: 8px;
  border-radius: 999px;
  background: var(--key-edge-dark);
  opacity: 0.18;
  filter: blur(5px);
  pointer-events: none;
  z-index: 1;

  @media (min-width: 701px) and (max-height: 720px) {
    bottom: 6px;
    height: 6px;
  }
`;

const ButtonLabel = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--key-label);
  font-size: 1.85rem;
  font-weight: 900;
  text-shadow: 0 2px 0 var(--key-label-shadow);

  svg {
    font-size: 1.65rem;
    filter: drop-shadow(0 2px 0 var(--key-label-shadow));
  }

  @media (min-width: 701px) and (max-height: 720px) {
    font-size: 1.55rem;

    svg {
      font-size: 1.38rem;
    }
  }

  @media (max-width: 500px) {
    font-size: 2.15rem;

    svg {
      font-size: 1.95rem;
      filter: none;
    }
  }
`;
