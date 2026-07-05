import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaStar, FaBolt } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { AppContext } from "../../Contexts/AppContext";

export default function TaboadaCompleta() {
  const { tabuada } = useParams();
  const { getLocalStorageValue } = useContext(AppContext);
  const tabuNumber = Number.parseInt(tabuada, 10) || 1;
  const [table, setTable] = useState([]);
  const starsEarned = Number(getLocalStorageValue(`stars_${tabuNumber}`)) || 0;

  useEffect(() => {
    const newTable = [];

    for (let i = 1; i <= 10; i++) {
      newTable.push({
        id: i,
        label: `${tabuNumber} x ${i}`,
        result: i * tabuNumber,
      });
    }

    setTable(newTable);
  }, [tabuNumber]);

  return (
    <Container>
      <SkyGlow className="left" />
      <SkyGlow className="right" />

      <TopBar>
        <BackButton to="/tabuadalevels">
          <MdArrowBackIosNew />
        </BackButton>
      </TopBar>

      <Content>
        <HeroCard>
          <HeroBadge>Modo estudo</HeroBadge>
          <Title>Tabuada do {tabuNumber}</Title>
          <Description>
            Memorize a sequencia, veja os resultados e depois entre no desafio
            valendo estrelas.
          </Description>

          <Highlights>
            <HighlightCard>
              <span>
                <FaBolt />
                Multiplicador
              </span>
              <strong>x{tabuNumber}</strong>
            </HighlightCard>

            <HighlightCard>
              <span>
                <FaStar />
                Estrelas
              </span>
              <strong>{starsEarned}/5</strong>
            </HighlightCard>
          </Highlights>
        </HeroCard>

        <LessonCard>
          <SectionHeader>
            <div>
              <small>Sequencia completa</small>
              <h2>Treine do 1 ao 10</h2>
            </div>
            <StepBadge>10 contas</StepBadge>
          </SectionHeader>

          <TableGrid>
            {table.map((item, index) => (
              <TableItem key={item.id}>
                <EquationGroup>
                  <div>
                    <span>
                      {item.label} = {item.result}
                    </span>
                    <small>Resultado da rodada</small>
                  </div>
                </EquationGroup>
              </TableItem>
            ))}
          </TableGrid>
        </LessonCard>
      </Content>

      <FloatingActionArea>
        <ActionHint>Quando se sentir pronto, comece a partida.</ActionHint>
        <PlayButton to={`/TabuadaGame/${tabuNumber}`}>
          <FaPlay />
          Jogar agora
        </PlayButton>
      </FloatingActionArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #f2fbff;
  padding: 18px 16px 140px;
  position: relative;
  overflow: hidden;
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
`;

const SkyGlow = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  filter: blur(24px);
  z-index: 0;

  &.left {
    left: -90px;
    top: 120px;
    background: rgba(88, 196, 255, 0.08);
  }

  &.right {
    right: -70px;
    top: 40px;
    background: rgba(255, 98, 130, 0.08);
  }
`;

const TopBar = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0 auto 18px;
  position: relative;
  z-index: 1;
`;

const BackButton = styled(Link)`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(180deg, #7bdcff 0%, #4a9dff 60%, #6b6dff 100%);
  border: 2px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 10px 18px rgba(27, 92, 186, 0.22);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
`;

const Content = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroCard = styled(motion.section)`
  padding: 24px 20px 20px;
  border-radius: 30px;
  background:
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
    );
  border: 1px solid rgba(123, 201, 255, 0.22);
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.3);
`;

const HeroBadge = styled.span`
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
`;

const Title = styled.h1`
  margin-top: 12px;
  font-size: clamp(2.1rem, 6vw, 3rem);
  line-height: 0.94;
  text-shadow: 0 4px 0 rgba(24, 42, 89, 0.45);
`;

const Description = styled.p`
  margin-top: 10px;
  color: rgba(241, 248, 255, 0.9);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled.div`
  padding: 14px 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.92rem;
    font-weight: 800;
    color: rgba(241, 248, 255, 0.9);
  }

  strong {
    font-size: 1.2rem;
    color: #fff;
  }

  svg {
    color: #ffd86a;
  }
`;

const LessonCard = styled(motion.section)`
  margin-top: 18px;
  padding: 22px 16px 18px;
  border-radius: 30px;
  background:
    radial-gradient(
      circle at top left,
      rgba(88, 196, 255, 0.08),
      transparent 28%
    ),
    linear-gradient(135deg, #12263d 0%, #143052 58%, #222f6a 100%);
  border: 1px solid rgba(123, 201, 255, 0.18);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.24);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  small {
    color: #8fdcff;
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h2 {
    margin-top: 4px;
    font-size: clamp(1.4rem, 5vw, 2rem);
    color: #fff;
  }

  @media (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const StepBadge = styled.span`
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f2fbff;
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
`;

const TableGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const TableItem = styled(motion.div)`
  padding: 14px;
  border-radius: 22px;
  background: linear-gradient(135deg, #17314c 0%, #143052 55%, #232f70 100%);
  border: 1px solid rgba(123, 201, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 420px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const EquationGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    display: block;
    font-size: 1.2rem;
    font-weight: 800;
    color: #f4fbff;
  }

  small {
    display: block;
    margin-top: 4px;
    color: rgba(223, 245, 255, 0.72);
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

const Order = styled.span`
  min-width: 48px;
  height: 48px;
  padding: 0 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8fdcff;
  font-size: 0.95rem;
  font-weight: 900;
`;

const ResultBubble = styled.strong`
  min-width: 82px;
  text-align: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, #7bdcff 0%, #3c9dff 65%, #6b6dff 100%);
  color: #fff;
  font-size: 1.08rem;
  box-shadow: 0 10px 18px rgba(60, 157, 255, 0.22);
`;

const FloatingActionArea = styled.div`
  width: 100%;
  max-width: 620px;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  padding: 14px 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 3;
  background: linear-gradient(
    180deg,
    rgba(7, 19, 31, 0) 0%,
    rgba(7, 19, 31, 0.92) 38%,
    rgba(7, 19, 31, 0.98) 100%
  );
`;

const ActionHint = styled.p`
  color: rgba(241, 248, 255, 0.78);
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
`;

const PlayButton = styled(Link)`
  width: min(100%, 360px);
  min-height: 62px;
  padding: 16px 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, #ff8d74 0%, #ff5f7a 100%);
  border: 3px solid rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 28px rgba(255, 95, 122, 0.26);
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 900;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 30px rgba(255, 95, 122, 0.32);
  }

  &:active {
    transform: scale(0.98);
  }
`;
