
type ActionBase<K, V = void> = V extends void ? { type: K } : { type: K } & V
type AreaType = { x: number, y: number }
type Action =
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
	endGame: 'WIN' | 'LOSE' | 'PLAYING',
	grid: boolean[][],
	minefield: boolean[][],
	startedOn?: number,
	endedOn?: number,
}

export type MinesweeperActions = {
	newGame: () => MinesweeperState,
	revealArea: ({ x, y }: { x: number, y: number }) => MinesweeperState,
	flagArea: ({ x, y }: { x: number, y: number }) => MinesweeperState,
}

export const nbOfMines = {
	[GameLevel.Easy]: 10,
	[GameLevel.Medium]: 40,
	[GameLevel.Hard]: 80,
	[GameLevel.Impossible]: 250,
}

export default function MinesweeperReducer(state: MinesweeperState, action: Action): MinesweeperState {

	switch (action.type) {
		case 'NEW_GAME':
			const grid = _createGrid(action.payload)
			// Mines layer
			const minefield = _placeMines(action.payload, grid);
			// Discovery layer
			const board = _createFog(grid)

			return {
				...state,
				level: action.payload,
				minesCount: nbOfMines[action.payload],
				flagsCount: 0,
				moves: [] as { x: number, y: number }[],
				endGame: 'PLAYING',
				grid,
				minefield,
				board,
				startedOn: new Date().getMilliseconds(),
				endedOn: undefined,
			}
		case 'REVEAL_AREA':
			const revealArea = (current: MinesweeperState, { x, y }: { x: number, y: number }): MinesweeperState => {
				if (current.board[x]?.[y] === undefined || current.board[x]?.[y]?.isVisible)
					return { ...current }

				if (current.minefield[x][y]) {
					const newBoard = [...state.board]
						.map((row, yIndex) => {
							return row.map((_, xIndex) => {
								const newArea = {
									isFlagged: false,
									isVisible: true,
									value: current.minefield[yIndex][xIndex]
										? undefined
										: _getNeighbors(current.minefield, { x: yIndex, y: xIndex })
								}
								return newArea
							})
						})
					return {
						...current,
						moves: [...current.moves, { x, y }],
						minesCount: current.minesCount - 1,
						board: newBoard,
						endGame: 'LOSE',
						endedOn: new Date().getMilliseconds(),
					}
				}

				const minesNearby = _getNeighbors(current.minefield, { x, y })
				const newBoard = [...current.board]
				newBoard[x][y] = { isVisible: true, isFlagged: false, value: minesNearby }
				if (minesNearby === 0) {
					if (!current.board[x - 1]?.[y - 1]?.isVisible) revealArea(current, { x: x - 1, y: y - 1 })
					if (!current.board[x - 1]?.[y]?.isVisible) revealArea(current, { x: x - 1, y })
					if (!current.board[x - 1]?.[y + 1]?.isVisible) revealArea(current, { x: x - 1, y: y + 1 })
					if (!current.board[x]?.[y - 1]?.isVisible) revealArea(current, { x, y: y - 1 })
					if (!current.board[x]?.[y + 1]?.isVisible) revealArea(current, { x, y: y + 1 })
					if (!current.board[x + 1]?.[y - 1]?.isVisible) revealArea(current, { x: x + 1, y: y - 1 })
					if (!current.board[x + 1]?.[y]?.isVisible) revealArea(current, { x: x + 1, y: y })
					if (!current.board[x + 1]?.[y + 1]?.isVisible) revealArea(current, { x: x + 1, y: y + 1 })
				}

				const remainingAreas = _getRemainingAreas(newBoard, state.minefield)
				if (!remainingAreas.length) {
					return {
						...current,
						moves: [...current.moves, { x, y }],
						minesCount: current.minesCount - 1,
						board: newBoard,
						endGame: 'WIN',
						endedOn: new Date().getMilliseconds(),
					}
				}

				return {
					...current,
					moves: [...current.moves, { x, y }],
					board: newBoard,
				}
			}
			return revealArea(state, action.payload)
		case 'FLAG_AREA':
			const currentCell = state.board[action.payload.x][action.payload.y]
			const isFlagged = currentCell.isFlagged
            console.log(" LOG:  >  MinesweeperReducer  >  isFlagged", isFlagged)
			const newBoard = [...state.board]
			newBoard[action.payload.x][action.payload.y] = { isVisible: false, isFlagged: !currentCell.isFlagged }
			return {
				...state,
				board: newBoard,
				minesCount: isFlagged ? state.minesCount + 1 : state.minesCount - 1,
			}
		default:
			return state
	}
}

export const initialise = (level: GameLevel) => _createFog(_createGrid(level))

const _createGrid = (level: GameLevel): boolean[][] => {
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

const _placeMines = (level: GameLevel, field: boolean[][]): boolean[][] => {
	const locations = field
		.reduce((acc, curr, yIndex) => {
			curr.forEach((_, xIndex) => { acc.push({ y: yIndex, x: xIndex }) })
			return acc
		}, [] as { x: Number, y: number }[])
		.sort(() => 0.5 - Math.random())
		.slice(0, nbOfMines[level])
	const minefield = field.map((row, yIdx) => row
		.map((_, xIdx) => locations
			.map(mine => `${mine.x}_${mine.y}`)
			.includes(`${xIdx}_${yIdx}`)))
	return minefield
}

const _createFog = (field: boolean[][]) => {
	const fog = field
		.map(row => row
			.map(_ => ({
				isVisible: false,
				isFlagged: false,
				value: undefined
			})))
	return fog
}

const _getNeighbors = (minefield: boolean[][], { x, y }: { x: number; y: number; }): number => {
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

const _getRemainingAreas = (
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

