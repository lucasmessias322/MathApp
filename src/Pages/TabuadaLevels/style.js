import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
`;

export const LevelContainer = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  padding-top: 120px;
`;

export const Level = styled.li`
  list-style: none;
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 105px;
    height: 105px;
    padding: 20px;

    margin: 5px;
    /* background: linear-gradient(to bottom, #006eff, #0059ce); */
    background: linear-gradient(179deg, #014ad8 1.22%, #002466 98.84%);
    box-shadow: 5px 5px 4px 0px #010b1f;
    color: white;
    font-size: 30px;
    font-weight: bold;
    border-radius: 20px;

    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: #343541;
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 5px 5px 4px 0px #010b1f inset;
    }

    div.stars {
      display: flex;
      font-size: 12px;
      padding: 5px 0px;
    }
  }
`;

export const ReturnArrow = styled.div`
  padding: 5px;
  font-size: 40px;
  color: #0059ff;
  position: fixed;
  width: 100px;
  height: 100px;
  z-index: 9999;
  top: 70px;
`;
