import { Game, Gameplay } from '../minesweeper-game';
import { MinesweeperAction } from './minesweeper-actions';

const defaultState = Gameplay.create({
	mineCount: 0,
	width: 1,
	height: 1,
})

export function minesweeperStore(state: Game = defaultState, action: MinesweeperAction): Game {
	switch (action.type) {
		case 'RESET_GAME':
			return Gameplay.create(action.options)
		case 'REVEAL_LOCATION':
			return Gameplay.reveal(state, action.xy)
		case 'FLAG_LOCATION':
			return Gameplay.flag(state, action.xy)
		default:
			return state
	}
}
