import React, { useEffect } from "react";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeaderComponent({
  handleButtonClicked,
  isSoundEnabled,
  recordGamePoints,
  currentGamepoints,
}) {
  return (
    <Header>
      <OptionsLeft>
        <Option>
          <Link to="/">
            <FaHome />
          </Link>
        </Option>
        <Option onClick={() => handleButtonClicked("🔊")}>
          {isSoundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </Option>
      </OptionsLeft>
      {recordGamePoints >= 0 && (
        <h2>
          {currentGamepoints}/{recordGamePoints}
        </h2>
      )}
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
`;

const OptionsLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div`
  width: 35px;
  height: 35px;
  padding: 5px;
  margin: 0px 5px;
  font-size: 20px;
  border: 2px solid #006eff;
  background-color: #006eff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
