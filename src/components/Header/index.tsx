import styled from "styled-components";

export default function Header({ bg, children }) {
  return <HeaderContainer bg={bg}>{children}</HeaderContainer>;
}

const HeaderContainer = styled.div`
  width: 100%;
  padding: 20px 24px;
  position: fixed;
  z-index: 9999;
  top: 0;

  background-color: ${(props) => props.bg || "#ffe97f"};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  font-family: 'Fredoka One', 'Comic Sans MS', cursive;
`;
