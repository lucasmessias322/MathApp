import LevelsComponent from "../../components/LevelsComponent";
import { MutiplicationphasesList } from "../../components/AditAndSubtrComponents/aditAndSubtrphasesList";

export default function MutiplicationLevels() {
  return (
    <LevelsComponent
      gameUrlPath="/multiplicationgame"
      phasesListName="mutiplicationphasesList"
      phasesList={MutiplicationphasesList}
    />
  );
}
