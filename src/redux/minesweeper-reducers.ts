import { Game, Minesweeper } from '../minesweeper-game';
import { MinesweeperAction } from './minesweeper-actions';

const defaultState = Minesweeper.create({
	mineCount: 0,
	width: 1,
	height: 1,
});

export function minesweeperStore(state: Game = defaultState, action: MinesweeperAction): Game {
	switch (action.type) {
		case 'RESET_GAME':
			return Minesweeper.create(action.options)
		case 'REVEAL_LOCATION':
			return Minesweeper.reveal(state, action.xy)
		case 'FLAG_LOCATION':
			return Minesweeper.flag(state, action.xy)
		default:
			return state
	}
}
