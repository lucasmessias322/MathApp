import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaGamepad,
  FaRocket,
  FaStar,
  FaDice,
  FaCrown,
  FaBolt,
  FaFire,
  FaMedal,
} from "react-icons/fa";
import { motion } from "framer-motion";

const gameModes = [
  {
    to: "aditionlevels",
    title: "Soma Turbo",
    subtitle: "Pratique somas rapidas e avance pelos desafios",
    icon: <FaRocket />,
    colors: ["#ff9b5f", "#ff5f7a"],
    glow: "rgba(255, 95, 122, 0.35)",
    badge: "Treino rapido",
  },
  {
    to: "subtractionlevels",
    title: "Missao Subtracao",
    subtitle: "Derrube numeros e complete desafios de precisao",
    icon: <FaStar />,
    colors: ["#62d7ff", "#3f8dff"],
    glow: "rgba(63, 141, 255, 0.34)",
    badge: "Treino tatico",
  },

  {
    to: "/multiplicationlevels",
    title: "Multiplicacao",
    subtitle: "Treine multiplicacoes e avance pelos desafios",
    icon: <FaBolt />,
    colors: ["#ff9b5f", "#ff5f7a"],
    glow: "rgba(255, 95, 122, 0.35)",
    badge: "Treino rapido",
  },
  {
    to: "/tabuadalevels",
    title: "Reino da Tabuada",
    subtitle: "Treine cada tabuada e colecione estrelas",
    icon: <FaCrown />,
    colors: ["#8b7bff", "#4f67ff"],
    glow: "rgba(79, 103, 255, 0.34)",
    badge: "Modo estrelas",
  },
  {
    to: "/tabuadatleatoria",
    title: "Modo Surpresa",
    subtitle: "Perguntas aleatorias para testar reflexo e memoria",
    icon: <FaDice />,
    colors: ["#2fd2c3", "#18a7ff"],
    glow: "rgba(24, 167, 255, 0.32)",
    badge: "Mais radical",
  },
];

const highlights = [
  { icon: <FaBolt />, label: "Desafios rapidos" },
  { icon: <FaFire />, label: "Mais energia visual" },
  { icon: <FaMedal />, label: "Cara de jogo" },
];

export default function DashBoard() {
  return (
    <Container>
      <Glow className="left" />
      <Glow className="right" />
      <Glow className="middle" />
      <GridGlow />

      <Headerlogo>
        <BrandRow>
          <LogoBubble>
            <FaGamepad className="gamepadIco" />
          </LogoBubble>

          <BrandCopy>
            <TitleBadge>Math Arcade</TitleBadge>
            <h1>MathGames</h1>
            <p>Escolha sua vibe e pratique matematica com mais atitude.</p>
          </BrandCopy>
        </BrandRow>

        <HeroCard>
          <HeroAccent className="pink" />
          <HeroAccent className="blue" />

          <HeroTop>
            <HeroBadge>Desafio em destaque</HeroBadge>
            <HeroTag>Visual remixado</HeroTag>
          </HeroTop>

          <HeroTitle>
            Aprender ficou com mais clima de jogo, mais neon e mais energia.
          </HeroTitle>

          <HeroText>
            Escolha um modo, ganhe progresso e transforme treino em missao.
          </HeroText>

          <HighlightRow>
            {highlights.map((item) => (
              <HighlightPill key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </HighlightPill>
            ))}
          </HighlightRow>
        </HeroCard>
      </Headerlogo>

      <GamesContainer>
        {gameModes.map((mode, index) => (
          <Game key={mode.title} $colors={mode.colors} $glow={mode.glow}>
            <Link to={mode.to}>
              <CardSpark />
              <IconBubble>{mode.icon}</IconBubble>

              <GameInfo>
                <small>{mode.badge}</small>
                <span>{mode.title}</span>
                <p>{mode.subtitle}</p>
              </GameInfo>

              <CardArrow>Jogar</CardArrow>
            </Link>
          </Game>
        ))}
      </GamesContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 28px 16px 40px;
  margin: 0 auto;
  background:
    radial-gradient(
      circle at top center,
      rgba(94, 180, 255, 0.12),
      transparent 24%
    ),
    radial-gradient(
      circle at 20% 20%,
      rgba(255, 98, 130, 0.08),
      transparent 22%
    ),
    linear-gradient(180deg, #07131f 0%, #0e2235 46%, #0a1826 100%);
  position: relative;
  overflow: hidden;
`;

const GridGlow = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(123, 201, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 201, 255, 0.08) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent 92%);
`;

const Glow = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  filter: blur(26px);

  &.left {
    top: 90px;
    left: -100px;
    background: rgba(255, 98, 130, 0.12);
  }

  &.right {
    bottom: 20px;
    right: -80px;
    background: rgba(91, 197, 255, 0.12);
  }

  &.middle {
    top: 220px;
    right: 18%;
    width: 180px;
    height: 180px;
    background: rgba(126, 123, 255, 0.14);
  }
`;

const Headerlogo = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 8px 4px 20px;
  position: relative;
  z-index: 1;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  color: #fff;

  @media (max-width: 560px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BrandCopy = styled.div`
  text-align: left;

  h1 {
    font-size: clamp(3rem, 8vw, 5rem);
    line-height: 0.92;
    letter-spacing: 0.02em;
    text-shadow: 0 6px 0 rgba(32, 58, 101, 0.55);
  }

  p {
    margin-top: 8px;
    max-width: 560px;
    font-size: clamp(1.05rem, 2.8vw, 1.38rem);
    font-weight: 700;
    color: rgba(240, 249, 255, 0.94);
  }

  @media (max-width: 560px) {
    text-align: center;
  }
`;

const TitleBadge = styled.span`
  display: inline-flex;
  margin-bottom: 10px;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 98, 130, 0.95),
    rgba(126, 123, 255, 0.95)
  );
  color: #fff;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const LogoBubble = styled.div`
  width: 98px;
  height: 98px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #7bdcff 0%, #3c9dff 58%, #6b6dff 100%);
  border: 4px solid rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 34px rgba(60, 157, 255, 0.25);

  .gamepadIco {
    font-size: 44px;
    color: #ffffff;
    transform: rotate(-8deg);
  }
`;

const HeroCard = styled(motion.div)`
  margin: 26px auto 0;
  max-width: 760px;
  padding: 22px 24px 20px;
  border-radius: 30px;
  background: linear-gradient(
    135deg,
    rgba(17, 36, 58, 0.94) 0%,
    rgba(16, 30, 54, 0.9) 52%,
    rgba(28, 37, 77, 0.92) 100%
  );
  border: 1px solid rgba(132, 205, 255, 0.18);
  backdrop-filter: blur(14px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
  color: #fff;
  position: relative;
  overflow: hidden;
`;

const HeroAccent = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  filter: blur(24px);

  &.pink {
    top: -80px;
    right: -20px;
    background: rgba(255, 98, 130, 0.18);
  }

  &.blue {
    bottom: -90px;
    left: 22%;
    background: rgba(91, 197, 255, 0.12);
  }
`;

const HeroTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
  z-index: 1;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeroBadge = styled.span`
  width: fit-content;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, #3c9dff, #7b7cff);
  color: #fff;
  font-size: 0.94rem;
  font-weight: 800;
`;

const HeroTag = styled.span`
  width: fit-content;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffd7e2;
  font-size: 0.88rem;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const HeroTitle = styled.strong`
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 16px;
  font-size: clamp(1.4rem, 3.5vw, 2.05rem);
  line-height: 1.02;
  max-width: 620px;
`;

const HeroText = styled.span`
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 8px;
  font-size: 1.04rem;
  font-weight: 600;
  color: rgba(240, 249, 255, 0.86);
`;

const HighlightRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

const HighlightPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f6fbff;
  font-size: 0.92rem;
  font-weight: 800;
`;

const GamesContainer = styled.ul`
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 30px;
  list-style: none;
  position: relative;
  z-index: 1;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Game = styled(motion.li)`
  border-radius: 34px;
  cursor: pointer;
  width: 100%;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  background: linear-gradient(
    135deg,
    ${(props) => props.$colors?.[0] || "#69c6ff"} 0%,
    ${(props) => props.$colors?.[1] || "#3c8eff"} 100%
  );
  border: 3px solid rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 36px ${(props) => props.$glow || "rgba(0, 0, 0, 0.25)"};
  overflow: hidden;
  position: relative;

  a {
    min-height: 178px;
    padding: 22px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 0 24px 42px ${(props) => props.$glow || "rgba(0, 0, 0, 0.32)"};
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 560px) {
    a {
      grid-template-columns: auto 1fr;
      min-height: 164px;
    }
  }
`;

const CardSpark = styled.div`
  position: absolute;
  top: -30px;
  right: -8px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  filter: blur(10px);
`;

const IconBubble = styled.div`
  width: 82px;
  height: 82px;
  min-width: 82px;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.22);
  border: 3px solid rgba(255, 255, 255, 0.64);
  color: #fff;
  font-size: 2rem;
  box-shadow: inset 0 -6px 10px rgba(255, 255, 255, 0.15);
`;

const GameInfo = styled.div`
  color: #fff;

  small {
    display: inline-flex;
    padding: 5px 12px;
    margin-bottom: 8px;
    border-radius: 999px;
    background: rgba(14, 25, 39, 0.18);
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  span {
    display: block;
    font-size: clamp(1.9rem, 4vw, 2.25rem);
    font-weight: 800;
    line-height: 0.92;
    text-shadow: 0 4px 0 rgba(25, 33, 75, 0.18);
  }

  p {
    margin-top: 8px;
    font-size: 1.01rem;
    font-weight: 700;
    line-height: 1.08;
    color: rgba(255, 255, 255, 0.94);
    max-width: 290px;
  }
`;

const CardArrow = styled.span`
  align-self: end;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(14, 25, 39, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 800;

  @media (max-width: 560px) {
    display: none;
  }
`;
