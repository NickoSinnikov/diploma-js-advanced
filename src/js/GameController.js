import GamePlay from "./GamePlay";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import { generateTeam } from "./generators";
//import addPositionCharacted from "./Function";

 let userTeamPositions=[];
 let enemyTeamPositions = [];
export default class GameController {
    constructor(gamePlay, stateService) {
        this.gamePlay = gamePlay;
        this.stateService = stateService;
        this.userTeam = [];
        this.enemyTeam = [];
        this.level = null;
    }

    init() {
        // TODO: add event listeners to gamePlay events
        this.gamePlay.drawUi(themes[1]); //themes[gameState.level];
        this.userTeam = Team.getStartUserTeam();
        this.level = 1;
        this.enemyTeam = generateTeam(Team.getEnemyTeam(), 1, 2);
        console.log(this.userTeam, this.enemyTeam)
        this.addPositionCharacted(this.userTeam, this.enemyTeam);
        console.log(userTeamPositions, enemyTeamPositions)
        this.gamePlay.redrawPositions([...userTeamPositions, ...enemyTeamPositions ])
        
        // TODO: load saved stated from stateService
    }

    addPositionCharacted(userTeam, enemyTeam) {
        
        for (let i = 0; i < userTeam.length; i += 1) {
        let userStartPosition = this.randomUserPosition();
            userTeamPositions.push(new PositionedCharacter(userTeam[i], userStartPosition));
        }
        for (let i = 0; i < enemyTeam.length; i += 1) {
            let enemyStartPosition = this.randomEnemyPosition();
          enemyTeamPositions.push(new PositionedCharacter(enemyTeam[i], enemyStartPosition));
        }
    }

    randomUserPosition(){
        return Math.floor(Math.random() * 8) * 8 + ((Math.floor(Math.random() * 2)))
    }
    randomEnemyPosition(){
        return Math.floor(Math.random() * 8) * 8 + ((Math.floor(Math.random() * 2))+6)
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