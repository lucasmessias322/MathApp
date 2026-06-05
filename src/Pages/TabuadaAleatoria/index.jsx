import { useState, useEffect } from "react";
import MathLayout from "../../components/MathLayout";

export default function TabuadaAleatoria() {
  const [equation, setEquation] = useState("");
  const [response, setResponse] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [playCorrectSound, setPlayCorrectSound] = useState(false);
  const [playWrongSound, setPlayWrongSound] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [feedbackState, setFeedbackState] = useState("idle");
  const [feedbackTick, setFeedbackTick] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (feedbackState === "idle") {
      return undefined;
    }

    const timer = setTimeout(() => {
      setFeedbackState("idle");
    }, 650);

    return () => clearTimeout(timer);
  }, [feedbackState, feedbackTick]);

  useEffect(() => {
    generateEquation();
  }, []);

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    setEquation(`${num1} x ${num2}`);
    setCorrectAnswer(result);
    setResponse("");
  };

  const toggleSounds = (correct) => {
    setPlayCorrectSound(correct);
    setPlayWrongSound(!correct);
  };

  const checkAnswer = () => {
    const isCorrect = parseInt(response) === correctAnswer;

    setFeedbackState(isCorrect ? "correct" : "wrong");
    setFeedbackTick((prevTick) => prevTick + 1);
    setFeedbackMessage(isCorrect ? "Boa resposta" : "Tente outra vez");
    toggleSounds(isCorrect);

    if (isCorrect) {
      generateEquation();
    } else {
      setResponse(correctAnswer.toString());

      setTimeout(() => {
        setResponse("");
      }, 500);
    }
  };

  return (
    <MathLayout
      equation={equation}
      response={response}
      playCorrectSound={playCorrectSound}
      isSoundEnabled={isSoundEnabled}
      playWrongSound={playWrongSound}
      setPlayCorrectSound={setPlayCorrectSound}
      setPlayWrongSound={setPlayWrongSound}
      setResponse={setResponse}
      setIsSoundEnabled={setIsSoundEnabled}
      checkAnswer={checkAnswer}
      feedbackState={feedbackState}
      feedbackTick={feedbackTick}
      feedbackMessage={feedbackMessage}
    />
  );
}
