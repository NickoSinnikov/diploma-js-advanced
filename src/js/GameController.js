import GamePlay from "./GamePlay";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import addPositionCharacted from "./Function";

export let userTeamPositions=[];
export let enemyTeamPositions = [];
export default class GameController {
    constructor(gamePlay, stateService) {
        this.gamePlay = gamePlay;
        this.stateService = stateService;
        this.userTeam = [];
        this.enemyTeam = [];
    }

    init() {
        // TODO: add event listeners to gamePlay events
        this.gamePlay.drawUi(themes[1]); //themes[gameState.level];
        this.userTeam = Team.getStartUserTeam();
        this.enemyTeam = ganerateTeam(Team.getEnemyTeam(), 1, 2);
        addPositionCharacted(this.userTeam, this.enemyTeam);
        // TODO: load saved stated from stateService
    }

    onCellClick(index) {
        // TODO: react to click
    }

    onCellEnter(index) {
        // TODO: react to mouse enter
    }

    onCellLeave(index) {
        // TODO: react to mouse leave
    }
}