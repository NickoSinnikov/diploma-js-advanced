import GamePlay from "./GamePlay";
import themes from "./themes";
import PositionedCharacter from "./PositionedCharacter";
import Team from "./Team";
import { generateTeam } from "./generators";
import { getInfo, getRightPositions } from "./Function"
import cursors from './cursors'
//import addPositionCharacted from "./Function";

let userTeamPositions = [];
let enemyTeamPositions = [];
let currentSelected = 0;
export default class GameController {
    constructor(gamePlay, stateService) {
        this.gamePlay = gamePlay;
        this.stateService = stateService;
        this.userTeam = [];
        this.enemyTeam = [];
        this.level = null;
        this.index = 0;
        this.moove = 'user';
        this.selected = false;
        this.activeCharacter = {};
    }


    events() {
        this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
        this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
        this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    }


    init() {
        // TODO: add event listeners to gamePlay events
        this.events();
        this.gamePlay.drawUi(themes[1]); //themes[gameState.level];
        this.userTeam = Team.getStartUserTeam();
        this.level = 1;
        this.enemyTeam = generateTeam(Team.getEnemyTeam(), 1, 2);
        console.log(this.userTeam, this.enemyTeam)
        this.addPositionCharacted(this.userTeam, this.enemyTeam);
        console.log(userTeamPositions, enemyTeamPositions)
        this.gamePlay.redrawPositions([...userTeamPositions, ...enemyTeamPositions])

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

    randomUserPosition() {
        return Math.floor(Math.random() * 8) * 8 + ((Math.floor(Math.random() * 2)))
    }
    randomEnemyPosition() {
        return Math.floor(Math.random() * 8) * 8 + ((Math.floor(Math.random() * 2)) + 6)
    }


    onCellClick(index) {
        // TODO: react to click
        this.index = index;
        if (this.getIndex([...userTeamPositions])!== -1){
            this.gamePlay.deselectCell(currentSelected);
            this.gamePlay.selectCell(index);
            currentSelected = index;
            this.selected = true;
            this.activeCharacter = [...userTeamPositions].find((item)=>item.position===index);
            console.log(this.activeCharacter)
        } else {
            GamePlay.showError("Неверное действие!");
        }

    }

    onCellEnter(index) {
        // TODO: react to mouse enter
        this.index = index;
       
        for (const item of [...userTeamPositions, ...enemyTeamPositions]) {
            if (item.position === index) {
                this.gamePlay.showCellTooltip(getInfo(item.character), index);
            }
        } 

        if (this.selected){
            
            
            const rightPositions = getRightPositions(this.activeCharacter.position, this.activeCharacter.character.distance);
            const rightAttack = getRightPositions(this.activeCharacter.position, this.activeCharacter.character.distanceAttack);


            if (this.getIndex([...userTeamPositions])!== -1){
                this.gamePlay.setCursor(cursors.pointer);
            } else if (rightPositions.includes(index) && this.getIndex([...userTeamPositions, ...enemyTeamPositions]) === -1){
                this.gamePlay.selectCell(index, "green");
                this.gamePlay.setCursor(cursors.pointer);
            } else if(rightAttack.includes(index) && this.getIndex([...enemyTeamPositions]) !== -1){
                this.gamePlay.selectCell(index, "red");
                this.gamePlay.setCursor(cursors.crosshair);
            }
            else {
                this.gamePlay.setCursor(cursors.notallowed);
            }
        }
        
    }

    onCellLeave(index) {
        // TODO: react to mouse leave
        this.gamePlay.hideCellTooltip(index)
        this.gamePlay.deselectCell(index);
        this.gamePlay.setCursor(cursors.auto)
    }


    getIndex(arr){
        return arr.findIndex((item) => item.position===this.index)
    }
}


