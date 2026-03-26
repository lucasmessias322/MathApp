import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import NivelBarComponent from "../../components/NivelBarComponent";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AppContext } from "../../Contexts/AppContext";
import Header from "../../components/Header";

const numerosArray = Array.from({ length: 10 }, (_, index) => index + 1);

export default function TabuadaLevels() {
  const { getLocalStorageValue } = useContext(AppContext);
  const levels = numerosArray;

  function renderStars(level) {
    const stars = [];
    const starsEarned = Number(getLocalStorageValue(`stars_${level}`)) || 0;

    for (let i = 0; i < 5; i++) {
      if (i < starsEarned) {
        stars.push(<FaStar key={i} color="#ffc516" />);
      } else {
        stars.push(<FaStar key={i} color="#d5dbf7" />);
      }
    }

    return stars;
  }

  return (
    <Container>
      <Header bg="Transparent">
        {/* <ReturnArrow>
          <Link to="/">
            <MdArrowBackIosNew />
          </Link>
        </ReturnArrow> */}
        <NivelBarComponent />
      </Header>
      <div className="dd">
        <StageIntro
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <small>Missao especial</small>
          <h1>Escolha a tabuada</h1>
          <p>Treine uma por uma e junte estrelas em cada numero.</p>
        </StageIntro>

        <LevelContainer>
          {levels.map((elem, index) => (
            <Level
              key={elem}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <Link to={`/TaboadaCompleta/${elem}`}>
                <NumberBadge>{elem}</NumberBadge>
                <Label>Tabuada do {elem}</Label>
                <div className="stars">{renderStars(elem)}</div>
              </Link>
            </Level>
          ))}
        </LevelContainer>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background:
    radial-gradient(
      circle at top center,
      rgba(88, 196, 255, 0.12),
      transparent 18%
    ),
    radial-gradient(
      circle at 18% 18%,
      rgba(255, 98, 130, 0.08),
      transparent 20%
    ),
    radial-gradient(
      circle at 82% 18%,
      rgba(126, 123, 255, 0.1),
      transparent 20%
    ),
    linear-gradient(180deg, #07131f 0%, #0e2235 46%, #0a1826 100%);
  padding-bottom: 30px;

  div.dd{
    width: 100%;
    height: auto;
    padding-top: 180px;



   
  }
`;

const StageIntro = styled(motion.div)`
  max-width: 520px;
  margin: 0px auto 0;
  padding: 24px 18px 18px;

  border-radius: 28px;
  /* background:
    radial-gradient(
      circle at top right,
      rgba(255, 98, 130, 0.12),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      rgba(14, 29, 46, 0.9) 0%,
      rgba(15, 30, 54, 0.88) 55%,
      rgba(27, 35, 76, 0.9) 100%
    ); */
  border: 1px solid rgba(123, 201, 255, 0.22);
  backdrop-filter: blur(14px);
  text-align: center;
  color: #fff;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.3);

  small {
    display: inline-flex;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(60, 157, 255, 0.95),
      rgba(123, 124, 255, 0.95)
    );
    font-size: 0.9rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  h1 {
    margin-top: 10px;
    font-size: clamp(2.1rem, 5vw, 2.8rem);
    line-height: 0.95;
    text-shadow: 0 4px 0 rgba(24, 42, 89, 0.45);
  }

  p {
    margin-top: 6px;
    font-size: 1rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.94);
  }
`;

const LevelContainer = styled.ul`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 22px 10px 30px;
  gap: 18px;
`;

const Level = styled(motion.li)`
  list-style: none;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 152px;
    min-height: 160px;
    padding: 16px 12px 14px;
    background: linear-gradient(135deg, #17314c 0%, #143052 52%, #232f70 100%);
    border: 1px solid rgba(123, 201, 255, 0.22);
    box-shadow: 0 22px 34px rgba(4, 12, 23, 0.3);
    border-radius: 34px;
    color: #f4fbff;
    cursor: pointer;
    transition: all 0.2s ease;

    .stars {
      display: flex;
      justify-content: center;
      gap: 2px;
      font-size: 16px;
      color: #ffd56d;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 26px 40px rgba(44, 95, 204, 0.24);
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 0 10px 18px rgba(44, 95, 204, 0.18);
    }
  }
`;

const NumberBadge = styled.span`
  width: 62px;
  height: 62px;
  border-radius: 22px;
  background: linear-gradient(180deg, #7bdcff 0%, #3c9dff 65%, #6b6dff 100%);
  color: #fff;
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 12px 20px rgba(60, 157, 255, 0.28);
`;

const Label = styled.span`
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 800;
  line-height: 0.95;
  text-align: center;
`;

const ReturnArrow = styled.div`
  border-radius: 50%;
  background: linear-gradient(180deg, #7bdcff 0%, #4a9dff 60%, #6b6dff 100%);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 20px rgba(37, 94, 206, 0.24);

  a {
    transition: 0.3s;
    font-weight: bold;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(180deg, #8be0ff 0%, #5aa9ff 60%, #7b7cff 100%);
  }
`;
