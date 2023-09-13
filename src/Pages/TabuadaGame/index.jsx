// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { useParams } from "react-router-dom";
// import { FaVolumeUp, FaVolumeMute, FaCoins } from "react-icons/fa";

// export default function TabuadaGame() {
//   const tabuNumber = parseInt(useParams().tabuada);
//   const [equation, setEquation] = useState("");
//   const [response, setResponse] = useState("");
//   const [correctAnswer, setCorrectAnswer] = useState(0);
//   const [playCorrectSound, setPlayCorrectSound] = useState(false);
//   const [playWrongSound, setPlayWrongSound] = useState(false);
//   const [isSoundEnabled, setIsSoundEnabled] = useState(true);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     generateEquation();
//   }, [tabuNumber]);

//   const generateEquation = () => {
//     const num1 = tabuNumber;
//     const num2 = Math.floor(Math.random() * 10) + 1;
//     const result = num1 * num2;
//     setEquation(`${num1} x ${num2}`);
//     setCorrectAnswer(result);
//     setResponse("");
//     setPlayCorrectSound(false);
//     setPlayWrongSound(false);
//   };

//   const handleButtonClicked = (value) => {
//     if (value === "C") {
//       setResponse("");
//     } else if (value === "=") {
//       checkAnswer();
//     } else if (value === "🔊") {
//       setIsSoundEnabled(!isSoundEnabled);
//     } else {
//       setResponse(response + value);
//     }
//   };

//   const checkAnswer = () => {
//     if (parseInt(response) === correctAnswer) {
//       generateEquation();
//       setPlayCorrectSound(true);
//       setPlayWrongSound(false);
//       setScore(score + 1); // Increment score on correct answer
//     } else {
//       setPlayCorrectSound(false);
//       setPlayWrongSound(true);

//       if (score > 0) {
//         setScore(score - 1); // Decrement score on wrong answer, but only if score is positive
//       }

//       // Mostra a resposta correta em verde por meio segundo
//       setResponse(correctAnswer.toString());

//       setTimeout(() => {
//         setResponse("");
//       }, 500);
//     }
//   };

//   return (
//     <ContainerTabuada>
//       <Header>
//         <div className="volume" onClick={() => handleButtonClicked("🔊")}>
//           {isSoundEnabled ? (
//             <FaVolumeUp color="white" size={20} />
//           ) : (
//             <FaVolumeMute color="white" size={20} />
//           )}
//         </div>
//         <div className="score">
//           <FaCoins color="#ffd900" size={20} />
//           <span>{score}</span>
//         </div>
//       </Header>
//       <Container>
//         <DisplayEquation>{equation}</DisplayEquation>
//         <DisplayResponse>{response}</DisplayResponse>

//         <ButtonsContainer>
//           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
//             <Buttons key={value} onClick={() => handleButtonClicked(value)}>
//               {value}
//             </Buttons>
//           ))}
//         </ButtonsContainer>
//       </Container>
//       {playCorrectSound && isSoundEnabled && (
//         <audio
//           src="/soundeffects/rightanswer.mp3"
//           autoPlay
//           onEnded={() => setPlayCorrectSound(false)}
//         />
//       )}
//       {playWrongSound && isSoundEnabled && (
//         <audio
//           src="/soundeffects/mixkit-wrong-electricity-buzz-955.wav"
//           autoPlay
//           onEnded={() => setPlayWrongSound(false)}
//         />
//       )}
//     </ContainerTabuada>
//   );
// }

// const ContainerTabuada = styled.div`
//   color: white;
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   h2 {
//     color: #0471ff;
//     font-size: 30px;
//     text-align: center;
//   }
// `;

// const Header = styled.header`
//   width: 100%;
//   max-width: 400px;
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-bottom: 15px;

//   .volume {
//     border: 2px solid #006eff;
//     background-color: #006eff;
//     padding: 5px;
//     margin: 10px;
//     border-radius: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-right: 10px; // Add margin for spacing
//   }

//   .score {
//     background-color: #006eff;
//     padding: 5px 20px;
//     border-top-left-radius: 20px;
//     border-bottom-left-radius: 20px;

//     span {
//       font-size: 18px;
//       color: #ffffff;
//       padding-left: 10px;
//     }
//   }
// `;

// const Container = styled.div`
//   width: 90%;
//   max-width: 400px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto;

//   @media (min-width: 500px) {
//     padding: 0px;
//   }
// `;

// const DisplayEquation = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   padding: 20px;
//   border: 2px solid #006eff;
//   background-color: #343541;
//   border-radius: 10px;
//   height: 100px;
//   font-weight: bold;
//   font-size: 40px;
//   text-align: center;
// `;

// const DisplayResponse = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   padding: 20px;
//   border: 2px solid #006eff;
//   background-color: #343541;
//   border-radius: 10px;
//   height: 100px;
//   font-weight: bold;
//   font-size: 40px;
//   text-align: center;
//   margin-top: 10px;
// `;

// const ButtonsContainer = styled.ul`
//   width: 100%;
//   max-width: 350px;
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   /* padding: 10px; */
//   list-style: none;
//   margin: 10px auto;
// `;

// const Buttons = styled.button`
//   user-select: none;
//   outline: none;
//   border: none;
//   padding: 20px;
//   height: 90px;
//   width: 90px;
//   margin: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 35px;
//   font-weight: bold;
//   color: white;
//   background: linear-gradient(to bottom, #006eff, #0059ce);
//   border-radius: 10px;
//   border-bottom: 5px solid #174a8d;
//   cursor: pointer;
//   transition: transform 0.1s ease-in-out;

//   &:active {
//     transform: scale(0.95);
//   }

//   @media (min-width: 500px) {
//     height: 80px;
//     width: 80px;
//   }
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute, FaCoins } from "react-icons/fa";

export default function TabuadaGame() {
  const tabuNumber = parseInt(useParams().tabuada);
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);

  // Função para atualizar o recorde específico da taboada atual
  const updateRecord = () => {
    const currentRecord = localStorage.getItem(`record_${tabuNumber}`);
    if (score > parseInt(currentRecord) || currentRecord === null) {
      localStorage.setItem(`record_${tabuNumber}`, score.toString());
    }
  };

  useEffect(() => {
    generateEquation();
  }, [tabuNumber]);

  const generateEquation = () => {
    const num1 = tabuNumber;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    setEquation(`${num1} x ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
    setPlayCorrectSound(false);
    setPlayWrongSound(false);
  };

  const handleButtonClicked = (value) => {
    if (value === "C") {
      setResponse("");
    } else if (value === "=") {
      checkAnswer();
    } else if (value === "🔊") {
      setIsSoundEnabled(!isSoundEnabled);
    } else {
      setResponse(response + value);
    }
  };

  const checkAnswer = () => {
    if (parseInt(response) === correctAnswer) {
      generateEquation();
      setPlayCorrectSound(true);
      setPlayWrongSound(false);
      setScore(score + 1); // Increment score on correct answer

      // Chamada para atualizar o recorde
      updateRecord();
    } else {
      setPlayCorrectSound(false);
      setPlayWrongSound(true);

      if (score > 0) {
        setScore(score - 1); // Decrement score on wrong answer, but only if score is positive
      }

      // Mostra a resposta correta  por meio segundo
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);
    }
  };

  // Lê o recorde atual da taboada atual do localStorage
  const currentRecord = localStorage.getItem(`record_${tabuNumber}`);

  return (
    <ContainerTabuada>
      <Header>
        <div className="volume" onClick={() => handleButtonClicked("🔊")}>
          {isSoundEnabled ? (
            <FaVolumeUp color="white" size={20} />
          ) : (
            <FaVolumeMute color="white" size={20} />
          )}
        </div>
        <div className="scoreAndRecord">
          <div className="score">
            <FaCoins color="#ffd900" size={20} />
            <span>{score}</span>
          </div>
          <div className="record">
            <FaCoins color="#ffd900" size={20} />
            <span>Max: {currentRecord || 0}</span>
          </div>
        </div>
      </Header>
      <Container>
        <DisplayEquation>{equation}</DisplayEquation>
        <DisplayResponse>{response}</DisplayResponse>

        <ButtonsContainer>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "C", "="].map((value) => (
            <Buttons key={value} onClick={() => handleButtonClicked(value)}>
              {value}
            </Buttons>
          ))}
        </ButtonsContainer>
      </Container>
      {playCorrectSound && isSoundEnabled && (
        <audio
          src="/soundeffects/rightanswer.mp3"
          autoPlay
          onEnded={() => setPlayCorrectSound(false)}
        />
      )}
      {playWrongSound && isSoundEnabled && (
        <audio
          src="/soundeffects/mixkit-wrong-electricity-buzz-955.wav"
          autoPlay
          onEnded={() => setPlayWrongSound(false)}
        />
      )}
    </ContainerTabuada>
  );
}

const ContainerTabuada = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  h2 {
    color: #0471ff;
    font-size: 30px;
    text-align: center;
  }
`;

const Header = styled.header`
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

const Container = styled.div`
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

const DisplayEquation = styled.div`
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

const DisplayResponse = styled.div`
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

const ButtonsContainer = styled.ul`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 10px auto;
`;

const Buttons = styled.button`
  user-select: none;
  outline: none;
  border: none;
  padding: 20px;
  height: 90px;
  width: 90px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  font-weight: bold;
  color: white;
  background: linear-gradient(to bottom, #006eff, #0059ce);
  border-radius: 10px;
  border-bottom: 5px solid #174a8d;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 500px) {
    height: 80px;
    width: 80px;
  }
`;
