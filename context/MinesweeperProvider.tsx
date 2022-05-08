import { createContext, ReactNode, useEffect, useReducer } from 'react'
import MinesweeperReducer, { GameLevel, initialise, MinesweeperState } from '../games/MinesweeperGame'
import useTimer from '@/hooks/useTimer'

export default function MinesweeperProvider({ children }: { children: ReactNode; }) {
	const value = useMinesweeperHook();
	return (
		<MsContext.Provider value={value}>
			{children}
		</MsContext.Provider>
	);
}

const initialState: MinesweeperState = {
	level: GameLevel.Easy,
	board: initialise(GameLevel.Easy),
	moves: [],
	minesCount: 0,
	flagsCount: 0,
	endGame: 'PLAYING',
	minefield: [],
	grid: [],
};
const MsContext = createContext<ReturnType<typeof useMinesweeperHook> | null>(null);

export function useMinesweeperHook() {
	const [state, dispatch] = useReducer(MinesweeperReducer, initialState);
	const { timer, handleStart, handleReset, handlePause } = useTimer(0);

	useEffect(() => {
		switch (state.endGame) {
			case 'WIN':
				handlePause()
			case 'LOSE':
				handlePause()
			case 'PLAYING':
			default:
				return;
		}
	}, [state.endGame])

	const actions = {
		newGame: (level: GameLevel) => {
			handleReset()
			dispatch({ type: 'NEW_GAME', payload: level })
			handleStart()
		},
		revealArea: ({ x, y }: { x: number; y: number; }) => {
			if (!state.startedOn) {
				handleReset()
				dispatch({ type: 'NEW_GAME', payload: state.level })
				handleStart()
			}
			if (state.endGame !== 'PLAYING') return
			dispatch({ type: 'REVEAL_AREA', payload: { x, y } })
		},
		flagArea: ({ x, y }: { x: number; y: number; }) => {
			if (state.endGame !== 'PLAYING') return
			dispatch({ type: 'FLAG_AREA', payload: { x, y } })
		},
	};

	return {
		state,
		dispatch,
		actions,
		timer: {
			value: timer,
			handleStart,
			handleReset,
		},
	};
}
