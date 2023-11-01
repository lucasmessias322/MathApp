import React from "react";
import LevelsComponent from "../../components/LevelsComponent";
import { SubtractionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";

export default function SubtractionLevels() {
  return (
    <LevelsComponent
      gameUrlPath="/subtractiongame"
      phasesListName="subtractionphasesList"
      phasesList={SubtractionphasesList}
    />
  );
}
