import styled from "styled-components";

export default function Header({ bg, children }) {
  return <HeaderContainer bg={bg}>{children}</HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 100%;
 // max-width: 760px;
  margin: 0 auto;
  padding: 14px 14px 18px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
 // z-index: 9999;
  top: 0;
  /* background:
    radial-gradient(circle at top center, rgba(120, 216, 255, 0.12), transparent 65%),
    ${(props) =>
      props.bg && props.bg !== "Transparent"
        ? props.bg
        : "linear-gradient(180deg, rgba(15, 31, 48, 0.98) 0%, rgba(11, 24, 38, 0.98) 100%)"}; */
 // backdrop-filter: blur(18px);
  border-bottom-left-radius: 34px;
  border-bottom-right-radius: 34px;
  //border: 1px solid rgba(123, 201, 255, 0.18);
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  /* box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.05); */
  font-family: "Baloo 2", "Fredoka", sans-serif;

  &::before {
    content: "";
    position: absolute;
    left: 16px;
    right: 16px;
    top: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.18) 18%,
      rgba(255, 255, 255, 0.18) 82%,
      transparent 100%
    );
  }

  /* &::after {
    content: "";
    position: absolute;
    left: 22px;
    right: 22px;
    bottom: 10px;
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(74, 174, 255, 0.92), rgba(142, 226, 255, 0.22));
  } */

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 560px) {
    width: calc(100% - 20px);
    padding: 12px 12px 16px;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    gap: 10px;
  }
`;
