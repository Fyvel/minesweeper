import React from 'react'
import { Provider, connect } from 'react-redux';
import * as  Minesweeper from './minesweeper-game'
import MinesweeperStore from './redux/minesweeper-store'
import { MinesweeperActions } from './redux/minesweeper-actions'
import { Dispatch, Action, bindActionCreators } from 'redux';
import styles from './App.module.scss'


const DEFAULT_OPTIONS = {
	mineCount: 10,
	width: 10,
	height: 10,
};

type StateProps = Minesweeper.Game & {
	grid: string[][]
};

const mapStateToProps = (state: Minesweeper.Game): StateProps => {
	const { width, height } = state
	const grid: string[][] = []
	for (let y = 0; y < height; y++) {
		grid[y] = []
		for (let x = 0; x < width; x++) {
			grid[y][x] = [x, y].toString()
		}
	}

	return { ...state, grid }
};

type DispatchProps = {
	flagLocation: typeof MinesweeperActions.flagLocation,
	revealLocation: typeof MinesweeperActions.revealLocation,
	resetGame: typeof MinesweeperActions.resetGame,
};

// `mapDispatchToProps` returns bound versions of
// all action-creators.
const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps =>
	bindActionCreators(MinesweeperActions, dispatch)

type Props = StateProps & DispatchProps;


// The <App /> component's `Props` are the
// intersection of the props available after we
// `connect` the component
connect(mapStateToProps, mapDispatchToProps)(App);

export default function App() {
	return (
		<Provider store={MinesweeperStore}>
			{/* https://hackernoon.com/clone-minesweeper-in-15-minutes-with-typescript-react-and-redux-64be1a7a0264 */}
		</Provider>
	)
}
