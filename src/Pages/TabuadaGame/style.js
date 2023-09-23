import styled from "styled-components";

export const ContainerTabuada = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 5px 10px;

  transition: 1s ease-in-out;
  background: url("/termometerbg.png");
  background-size: 100%
    ${(props) => (props.fillHeight ? props.fillHeight + "%" : "0%")};
  background-repeat: no-repeat;
  background-position: bottom center;

  h2 {
    color: #0471ff;
    font-size: 30px;
    text-align: center;
  }
`;

export const Header = styled.header`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 15px;

  .volume {
    border: 2px solid #006eff;
    background-color: #006eff;
    padding: 5px;
    margin: 10px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .scoreAndRecord {
    display: flex;
    .score {
      background-color: #006eff;
      padding: 5px 10px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      span {
        font-size: 18px;
        color: #ffffff;
        padding-left: 10px;
      }
    }
    .record {
      background-color: #006eff;
      padding: 5px 20px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;

      span {
        font-size: 18px;
        color: #ffffff;
        padding-left: 10px;
      }
    }
  }
`;

export const Container = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (min-width: 500px) {
    padding: 0px;
  }
`;

export const ThermometerContainer = styled.div`
  width: 100%;
  height: 4px; /* Altura do termômetro */
  background-color: #ccc; /* Cor de fundo do termômetro */
  border-radius: 5px; /* Borda arredondada */
  margin: 5px 0px;
`;

export const ThermometerFill = styled.div`
  height: 100%;
  background: linear-gradient(270deg, #016fff 0%, #032b9a 100%);
  border-radius: 5px 0 0 5px; /* Borda arredondada apenas no lado esquerdo */
  transition: width 1s ease-in-out;
`;

export const DisplayEquation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  border: 2px solid #006eff;
  background-color: #19191f;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

export const DisplayResponse = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  border: 2px solid #006eff;
  background-color: #19191f;
  border-radius: 10px;
  height: 100px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-top: 10px;
`;
export const ButtonsContainer = styled.ul`
  width: 100%;
  max-width: 240px; /* Aumente a largura máxima para caber 3 botões por linha em dispositivos móveis */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas por linha */
  grid-column-gap: 0px; /* Espaçamento entre as colunas verticais dos botões */
  grid-row-gap: 0px; /* Espaçamento entre as linhas dos botões */
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 10px auto;

  @media (max-width: 500px) {
    max-width: 240px; /* Aumente a largura máxima para telas maiores, se necessário */
  }
`;

export const Buttons = styled.button`
  outline: none;
  border: none;
  /* padding: 20px; */
  height: 90px;
  width: 90px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom, #006eff, #0050b9);
  box-shadow: 0px 4px 4px 0px #001736;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  user-select: none;

  &:active {
    transform: scale(0.95);
    box-shadow: 0px 4px 4px 0px #001736 inset;
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
