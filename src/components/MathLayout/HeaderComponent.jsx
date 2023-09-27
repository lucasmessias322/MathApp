import React from "react";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaCoins } from "react-icons/fa";

export default function HeaderComponent({
  score,
  currentRecord,
  handleButtonClicked,
  isSoundEnabled
}) {
  return (
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
  );
}

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
