import { Options } from "../minesweeper-game"

type LocationAction = { xy: string }

export type MinesweeperAction =
	({ type: 'RESET_GAME', options: Options })
	| ({ type: 'REVEAL_LOCATION' } & LocationAction)
	| ({ type: 'FLAG_LOCATION' } & LocationAction)

export const MinesweeperActions = {
	flagLocation: ({ xy }: LocationAction): MinesweeperAction =>
		({ type: 'FLAG_LOCATION', xy }),
	revealLocation: ({ xy }: LocationAction): MinesweeperAction =>
		({ type: 'REVEAL_LOCATION', xy }),
	resetGame: (options: Options): MinesweeperAction =>
		({ type: 'RESET_GAME', options }),
}