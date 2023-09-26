import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const LevelContainer = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
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

    width: 100px;
    height: 100px;
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

export const NivelsBarContainer = styled.div`
  width: 100%;
  background-color: #19191f;

  /* border-bottom: 1px solid rgba(0, 0, 0, 0.25); */
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NivelBar = styled.div`
  width: 100%;
  height: 25px;
  background: #121216;
  border-radius: 20px;

  .fillnivelbar {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/nivelbarprogress.png");
    background-size: ${(props) =>
        props.fillWidth ? props.fillWidth + "%" : "0%"}
      100%;
    background-repeat: no-repeat;
    border-radius: 25px 0 0 25px;
    transition: width 0.5s ease-in-out;

    span {
      text-align: center;
      padding: 10px;
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
