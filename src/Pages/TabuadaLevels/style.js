import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  margin: 0px auto;
  background-color: #ffc355;
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

    span {
      color: #592c10;
    }

    width: 105px;
    height: 105px;
    padding: 20px;

    margin: 5px;

    background-color: #fff7db;
    border: 5px solid #ffc516;
    box-shadow: 5px 5px 4px 0px rgb(88, 67, 9);
    color: white;
    font-size: 30px;
    font-weight: bold;
    border-radius: 20px;

    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;

    &:hover {
      background-color: #ffc516;
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 5px 5px 4px 0px rgb(54, 41, 5) inset;
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
  color: #592c10;

  z-index: 9999;
`;
