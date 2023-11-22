import React, { useEffect } from "react";
import styled from "styled-components";
import { FaVolumeUp, FaVolumeMute, FaHome } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function HeaderComponent({
  handleButtonClicked,
  isSoundEnabled,
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

  /* .volume {
    border: 2px solid #006eff;
    background-color: #006eff;
    padding: 5px;
    margin: 10px;
    font-size: 25px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  } */
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
  margin-top: 10px;
  margin: 5px;
  font-size: 20px;
  border: 2px solid #006eff;
  background-color: #006eff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
