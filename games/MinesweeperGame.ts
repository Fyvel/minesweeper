
type ActionBase<K, V = void> = V extends void ? { type: K } : { type: K } & V
type AreaType = { x: number, y: number }
export type Action =
	| ActionBase<'NEW_GAME', { payload: GameLevel }>
	| ActionBase<'REVEAL_AREA', { payload: AreaType }>
	| ActionBase<'FLAG_AREA', { payload: AreaType }>

export enum GameLevel {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard',
	Impossible = 'Impossible',
}

export type MinesweeperState = {
	level: GameLevel,
	board: {
		isVisible: boolean,
		isFlagged: boolean,
		value?: number,
	}[][],
	moves: { x: number, y: number }[],
	minesCount: number,
	flagsCount: number,
	grid: boolean[][],
	minefield: boolean[][],
	startedOn?: number,
	endGame: 'WIN' | 'LOSE' | 'PLAYING',
	endedOn?: number,
}

export type MinesweeperActions = {
	newGame: () => MinesweeperState,
	revealArea: ({ x, y }: { x: number, y: number }) => MinesweeperState,
	flagArea: ({ x, y }: { x: number, y: number }) => MinesweeperState,
}

export const NbOfMines = {
	[GameLevel.Easy]: 10,
	[GameLevel.Medium]: 40,
	[GameLevel.Hard]: 80,
	[GameLevel.Impossible]: 250,
}

export default function MinesweeperReducer(state: MinesweeperState, action: Action): MinesweeperState {
	switch (action.type) {
		case 'NEW_GAME':
			return { ...NewGame(state, action.payload) }
		case 'REVEAL_AREA':
			return { ...RevealArea(state, action.payload) }
		case 'FLAG_AREA':
			return { ...FlagArea(state, action.payload) }
		default:
			return { ...state }
	}
}

export const Initialise = (level: GameLevel) => createFog(createGrid(level))

//#region FlagArea
function FlagArea(state: MinesweeperState, payload: AreaType) {
	const currentCell = { ...state.board[payload.x][payload.y] }
	const isFlagged = currentCell.isFlagged
	const boardFlagged = [...state.board]
	boardFlagged[payload.x][payload.y] = {
		...boardFlagged[payload.x][payload.y],
		isVisible: false,
		isFlagged: !currentCell.isFlagged
	}
	return {
		...state,
		board: boardFlagged,
		minesCount: isFlagged ? state.minesCount + 1 : state.minesCount - 1,
	}
}
//#endregion

//#region RevealArea
function RevealArea(state: MinesweeperState, payload: AreaType) {
	const boardRevealed = revealArea({ ...state }, payload)
	const newEndGame = calculateEndGame({
		board: boardRevealed,
		minefield: [...state.minefield]
	}, payload)
	const newMoves = addMove([...state.moves], payload)
	const newMinesCount = updateMinesCount({ ...state }, payload)
	return {
		...state,
		board: boardRevealed,
		moves: newMoves,
		minesCount: newMinesCount,
		...newEndGame
	}
}

const revealArea = (state: MinesweeperState, { x, y }: { x: number, y: number }): MinesweeperState['board'] => {
	const isAlreadyRevealed = state.board[x]?.[y] === undefined
		|| state.board[x]?.[y]?.isVisible
	if (isAlreadyRevealed)
		return [...state.board]

	const isMined = state.minefield[x][y]
	if (isMined) {
		const res = revealBoard(state)
		return res
	}

	let boardRevealed = [...state.board]
	const minesNearby = getNeighbors(state.minefield, { x, y })
	boardRevealed[x][y] = { isVisible: true, isFlagged: false, value: minesNearby }
	if (minesNearby === 0) {
		if (isNeighborVisible(state, x - 1, y - 1))
			boardRevealed = revealArea(state, { x: x - 1, y: y - 1 })
		if (isNeighborVisible(state, x - 1, y))
			boardRevealed = revealArea(state, { x: x - 1, y })
		if (isNeighborVisible(state, x - 1, y + 1))
			boardRevealed = revealArea(state, { x: x - 1, y: y + 1 })
		if (isNeighborVisible(state, x, y - 1))
			boardRevealed = revealArea(state, { x, y: y - 1 })
		if (isNeighborVisible(state, x, y + 1))
			boardRevealed = revealArea(state, { x, y: y + 1 })
		if (isNeighborVisible(state, x + 1, y - 1))
			boardRevealed = revealArea(state, { x: x + 1, y: y - 1 })
		if (isNeighborVisible(state, x + 1, y))
			boardRevealed = revealArea(state, { x: x + 1, y: y })
		if (isNeighborVisible(state, x + 1, y + 1))
			boardRevealed = revealArea(state, { x: x + 1, y: y + 1 })
	}
	return boardRevealed
}
const revealBoard = (currentState: MinesweeperState): MinesweeperState['board'] => {
	const revealed = currentState.board.map((row, yIndex) => {
		return row.map((_, xIndex) => ({
			isFlagged: false,
			isVisible: true,
			value: currentState.minefield[yIndex][xIndex]
				? undefined
				: getNeighbors(currentState.minefield, { x: yIndex, y: xIndex })
		}))
	})
	return [...revealed]
}
const isNeighborVisible = (state: MinesweeperState, x: number, y: number) => !state.board[x]?.[y]?.isVisible

const calculateEndGame = ({ board, minefield }: Pick<MinesweeperState, 'board' | 'minefield'>, payload: AreaType): {
	endGame: 'WIN' | 'LOSE' | 'PLAYING',
	endedOn?: number,
} => {
	const isMined = minefield[payload.x][payload.y]
	if (isMined) {
		return {
			endGame: 'LOSE',
			endedOn: new Date().getMilliseconds(),
		}
	}
	const remainingAreas = getRemainingAreas(board, minefield)
	if (!remainingAreas.length) {
		return {
			endGame: 'WIN',
			endedOn: new Date().getMilliseconds(),
		}
	}
	return {
		endGame: 'PLAYING',
		endedOn: undefined,
	}
}
const getRemainingAreas = (
	board: { isVisible: boolean; isFlagged: boolean; value?: number }[][],
	minefield: boolean[][]): { x: Number, y: number }[] => {
	const locations = board
		.reduce((acc, curr, yIndex) => {
			curr.forEach((area, xIndex) => {
				if (area.isVisible || minefield[yIndex][xIndex]) return
				acc.push({ y: yIndex, x: xIndex })
			})
			return acc
		}, [] as { x: Number, y: number }[])
	return locations
}


const addMove = (moves: { x: number; y: number }[], payload: AreaType) => [
	...moves,
	{ ...payload }
]

const updateMinesCount = (state: MinesweeperState, payload: AreaType): number => {
	const isMined = state.minefield[payload.x][payload.y]
	return state.minesCount - (isMined ? 1 : 0)
}

//#endregion

//#region NewGame
function NewGame(state: MinesweeperState, payload: GameLevel): MinesweeperState {
	const grid = createGrid(payload)
	// Mines layer
	const minefield = placeMines(payload, grid)
	// Discovery layer
	const board = createFog(grid)

	return {
		...state,
		level: payload,
		minesCount: NbOfMines[payload],
		flagsCount: 0,
		moves: [] as { x: number; y: number }[],
		endGame: 'PLAYING',
		grid,
		minefield,
		board,
		startedOn: new Date().getMilliseconds(),
		endedOn: undefined,
	}
}

const placeMines = (level: GameLevel, field: boolean[][]): boolean[][] => {
	const locations = field
		.reduce((acc, curr, yIndex) => {
			curr.forEach((_, xIndex) => { acc.push({ y: yIndex, x: xIndex }) })
			return acc
		}, [] as { x: Number, y: number }[])
		.sort(() => 0.5 - Math.random())
		.slice(0, NbOfMines[level])
	const minefield = field.map((row, yIdx) => row
		.map((_, xIdx) => locations
			.map(mine => `${mine.x}_${mine.y}`)
			.includes(`${xIdx}_${yIdx}`)))
	return minefield
}
//#endregion

//#region Helpers
const createFog = (field: boolean[][]) => {
	const fog = field
		.map(row => row
			.map(_ => ({
				isVisible: false,
				isFlagged: false,
				value: undefined
			})))
	return fog
}
const createGrid = (level: GameLevel): boolean[][] => {
	switch (level) {
		case GameLevel.Easy:
			return Array(9).fill(Array(9).fill(false))
		case GameLevel.Medium:
			return Array(16).fill(Array(16).fill(false))
		case GameLevel.Hard:
			return Array(24).fill(Array(24).fill(false))
		case GameLevel.Impossible:
			return Array(32).fill(Array(32).fill(false))
		default:
			throw new Error('Unknown level selected')
	}
}
const getNeighbors = (minefield: boolean[][], { x, y }: { x: number; y: number; }): number => {
	const count =
		[
			minefield[x - 1]?.[y - 1],
			minefield[x - 1]?.[y],
			minefield[x - 1]?.[y + 1],
			minefield[x]?.[y - 1],
			minefield[x]?.[y + 1],
			minefield[x + 1]?.[y - 1],
			minefield[x + 1]?.[y],
			minefield[x + 1]?.[y + 1],
		].reduce((acc, curr) => {
			if (curr) acc += 1
			return acc
		}, 0)
	return count
}
//#endregion

