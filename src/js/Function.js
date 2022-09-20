import PositionedCharacter from "./PositionedCharacter";
import { userTeamPositions } from "./GameController";
import { enemyTeamPositions } from "./GameController";

export default function addPositionCharacted(userTeam, enemyTeam) {
    for (let i = 0; i < userTeam.length; i += 1) {
      userTeamPositions.push(new PositionedCharacter(userTeam[i], 0));
    }
    for (let i = 0; i < enemyTeam.length; i += 1) {
      enemyTeamPositions.push(new PositionedCharacter(enemyTeam[i], 0));
    }
  }