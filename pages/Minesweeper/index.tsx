import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { MinesweeperState } from 'games/MinesweeperGame'
import MinesweeperProvider, { useMinesweeperHook } from 'context/MinesweeperProvider'
import { formatTime } from '@/utils/formatTime'
import Container, { TopBar, Button, Board, Grid, Row, Area } from './components'
import LevelSelector from './components/LevelSelector'

export default function Minesweeper() {
	return (
		<MinesweeperProvider>
			<MinesweeperConsumer />
		</MinesweeperProvider>
	)
}

enum Face {
	Playing = '😃',
	Won = '😎',
	Lost = '😵',
}
function MinesweeperConsumer() {
	const { state, timer, actions } = useMinesweeperHook()
	const [face, setFace] = useState(Face.Playing)
	const onClickCell = (xIndex: number, yIndex: number) => {
		actions.revealArea({ x: xIndex, y: yIndex });
	}
	const onContextClickCell = (xIndex: number, yIndex: number) => {
		actions.flagArea({ x: xIndex, y: yIndex })
		console.log(" LOG:  >  onContextClickCell  > ", { x: xIndex, y: yIndex })
	}

	useEffect(() => {
		setFace(getFace(state.endGame))
		const canVibrate = ('vibrate' in navigator)
		if (!canVibrate) return
		if (!state.endedOn || state.endGame === 'PLAYING') return
		navigator.vibrate(200)
	}, [state.endGame])

	return (
		<Container>
			<TopBar>
				{state.minesCount}
				<Button onClick={() => actions.newGame(state.level)}>
					{face}
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
	)
}

const getFace = (endGame: MinesweeperState['endGame']): Face => {
	switch (endGame) {
		case 'WIN':
			return Face.Won
		case 'LOSE':
			return Face.Lost
		case 'PLAYING':
		default:
			return Face.Playing
	}
}
