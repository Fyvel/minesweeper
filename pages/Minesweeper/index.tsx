import { useEffect, useState } from 'react'
import { MinesweeperState } from 'games/MinesweeperGame'
import MinesweeperProvider, { useMinesweeperHook } from 'context/MinesweeperProvider'
import { formatTime } from '@/utils/formatTime'
import Container, { TopBar, Button, Board, Grid, Row, Area } from './components'
import LevelSelector from './components/LevelSelector'
import LoadingScreen from './components/LoadingScreen'

export default function Minesweeper() {
	const { state, timer, actions } = useMinesweeperHook()

	const onClickCell = (xIndex: number, yIndex: number) => {
		actions.revealArea({ x: xIndex, y: yIndex });
	}
	const onContextClickCell = (xIndex: number, yIndex: number) => {
		actions.flagArea({ x: xIndex, y: yIndex })
	}

	useEffect(() => {
		const canVibrate = ('vibrate' in navigator)
		if (!canVibrate) return
		if (state.endGame === 'WIN' || state.endGame === 'LOSE') {
			navigator.vibrate(200)
		}
	}, [state.endGame])

	return (
		<MinesweeperProvider>
			<Container>
				<TopBar>
					{state.minesCount}
					<Button onClick={() => actions.newGame(state.level)}>
						{getFace(state.endGame)}
					</Button>
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
											e.stopPropagation()
											onClickCell(xIndex, yIndex)
										}}
										onContextMenu={(e) => {
											e.preventDefault()
											e.stopPropagation()
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
			</Container>
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
