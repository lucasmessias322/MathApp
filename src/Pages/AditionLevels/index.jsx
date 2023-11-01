import LevelsComponent from "../../components/LevelsComponent";
import { AditionphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";

export default function AditionLevels() {
  return (
    <LevelsComponent
      gameUrlPath="/aditiongame"
      phasesListName="aditionphasesList"
      phasesList={AditionphasesList}
    />
  );
}
