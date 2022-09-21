import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';


export default class Team {
	static getStartUserTeam(){
	const team = [new Bowman(1), new Swordsman(1)]
	
		return team;
	}

	static getUserTeam(){
		return [Bowman, Swordsman, Magician]
	}

	static getEnemyTeam(){
		return [Daemon, Undead, Vampire]
	}
}
