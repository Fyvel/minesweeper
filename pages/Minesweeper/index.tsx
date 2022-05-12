import { MinesweeperState } from 'games/MinesweeperGame'
import MinesweeperProvider, { useMinesweeperHook } from 'context/MinesweeperProvider'
import { formatTime } from '@/utils/formatTime'
import Board, { Area, Button, Grid, Row, TopBar } from './components'
import LevelSelector from "./components/LevelSelector"

export default function Minesweeper() {
	const { state, timer, actions } = useMinesweeperHook()

	const onClickCell = (xIndex: number, yIndex: number) => {
		actions.revealArea({ x: xIndex, y: yIndex });
	}
	const onContextClickCell = (xIndex: number, yIndex: number) => {
		actions.flagArea({ x: xIndex, y: yIndex })
	}

	return (
		<MinesweeperProvider>
			<TopBar>
				{state.minesCount}
				<Button onClick={() => actions.newGame(state.level)}>{getFace(state.endGame)}</Button>
				{formatTime(timer.value)}
			</TopBar>
			<Board level={state.level}>
				<Grid disabled={!!state.endedOn}>
					{!!state.board?.length && state.board.map((row, xIndex) => (
						<Row key={xIndex}>
							{row.map(({ isVisible, isFlagged, value }, yIndex) => (
								<Area
									key={`${xIndex}_${yIndex}`}
									aria-label="minefield area"
									onClick={(e) => {
										e.preventDefault()
										onClickCell(xIndex, yIndex)
									}}
									onContextMenu={(e) => {
										e.preventDefault()
										onContextClickCell(xIndex, yIndex)
									}}
									isVisible={isVisible}
									level={state.level}
								>
									{!!isVisible && (value === undefined
										? '💣'
										: value === 0
											? ''
											: `${value}`)}
									{!!isFlagged && '🚩'}
								</Area>
							))}
						</Row>
					))}
				</Grid>
			</Board>
			<LevelSelector onSelect={actions.newGame} />
		</MinesweeperProvider>
	)
}

const getFace = (endGame: MinesweeperState['endGame']) => {
	switch (endGame) {
		case 'WIN':
			return '😎'
		case 'LOSE':
			return '😵'
		case 'PLAYING':
		default:
			return '😃'
	}
}
