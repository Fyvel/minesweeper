export type GameStatus = 'Started' | 'Won' | 'Lost'
export type CellStatus = 'Unknown' | 'Revealed' | 'Flagged' | 'Exploded'

export type Cell = {
	status: CellStatus,
	revealedCount: number,
}
type Board = {
	cellsByXy: { [xy: string]: Cell },
	neighborsByXy: { [xy: string]: string[] },
	minesByXy: { [xy: string]: true },
}
export type Options = {
	mineCount: number,
	width: number,
	height: number,
}
export type Game = Options & Board & {
	status: GameStatus,
	moveCount: number,
}

type MinesweeperAPI = {
	create(options: Options): Game,
	reveal(prev: Game, xy: string): Game,
	flag(prev: Game, xy: string): Game,
}
export const Gameplay: MinesweeperAPI = {
	create,
	reveal,
	flag,
}

const NEIGHBORS = Object.freeze([
	[-1, -1], [0, -1], [1, -1],
	[-1, 0], /* :^) */[1, 0],
	[-1, 1], [0, 1], [1, 1],
])

const neighborXys = ({ width, height }: Options, x: number, y: number): string[] =>
	NEIGHBORS.reduce((xys: string[], [dx, dy]) => {
		const xf = x + dx
		const yf = y + dy
		if (xf > -1 && xf < width && yf > -1 && yf < height) {
			return xys.concat([xf, yf].toString())
		}
		return xys
	}, [])

function createBoard(options: Options): Board {
	const { height, width, mineCount } = options
	const board: Board = {
		cellsByXy: {},
		neighborsByXy: {},
		minesByXy: {},
	}

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const xy = [x, y].toString()
			board.cellsByXy[xy] = {
				revealedCount: -1,
				status: 'Unknown',
			}
			board.neighborsByXy[xy] = neighborXys(options, x, y)
		}
	}

	const xys = Object.keys(board.cellsByXy)
	for (let i = 0; i < mineCount; i++) {
		const index = Math.floor(Math.random() * xys.length)
		board.minesByXy[xys.splice(index, 1)[0]] = true
	}

	return board
}

const replaceCell = (game: Game, xy: string, cell: Cell): Game =>
	({
		...game,
		cellsByXy: { ...game.cellsByXy, [xy]: cell },
	})

const isCellKnown = ({ status }: Cell) =>
	(status === 'Revealed' || status === 'Exploded')

const isVictorious = (game: Game) => {
	const unknownCells = Object.keys(game.cellsByXy)
		.filter((xy) => !isCellKnown(game.cellsByXy[xy]))
	return (unknownCells.length === game.mineCount)
}

const countMines = (game: Game, xys: string[]) =>
	xys.reduce((count, xy) => {
		return game.minesByXy[xy] ? count + 1 : count
	}, 0)

const testLocation = (game: Game, xy: string): Game => {
	const cell = game.cellsByXy[xy]
	if (cell.status === 'Revealed') {
		return game
	} else if (game.minesByXy[xy]) {
		return {
			...replaceCell(game, xy, { ...cell, status: 'Exploded' }),
			status: 'Lost',
		}
	} else {
		const neighbors = game.neighborsByXy[xy]
		const revealedCount = countMines(game, neighbors)
		const nextGame = replaceCell(game, xy, {
			status: 'Revealed',
			revealedCount,
		})

		if (isVictorious(nextGame)) {
			return { ...nextGame, status: 'Won' }
		} else if (revealedCount === 0) {
			return testLocations(nextGame, neighbors)
		}
		return nextGame
	}
}

function testLocations(prev: Game, xys: string[]): Game {
	return xys.reduce((game, xy) => {
		const cell = game.cellsByXy[xy]
		if (cell && cell.status === 'Unknown')
			return testLocation(game, xy)
		return game
	}, prev)
}

function create(options: Options): Game {
	return {
		...options,
		...createBoard(options),
		status: 'Started',
		moveCount: 0,
	}
}

function reveal(game: Game, xy: string): Game {
	return {
		...testLocation(game, xy),
		moveCount: game.moveCount + 1,
	}
}

function flag(game: Game, xy: string): Game {
	const cell = game.cellsByXy[xy]
	if (cell.status === 'Unknown') {
		return replaceCell(game, xy, { ...cell, status: 'Flagged' })
	} else if (cell.status === 'Flagged') {
		return replaceCell(game, xy, { ...cell, status: 'Unknown' })
	} else if (cell.status === 'Revealed') {
		const unknownNeighbors = game.neighborsByXy[xy].filter(nxy =>
			game.cellsByXy[nxy].status === 'Unknown')
		return testLocations(game, unknownNeighbors)
	}
	return game
}
