import { GameLevel } from 'games/MinesweeperGame';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
    flex-flow: column;
    align-items: center;
`
export default Container

const boardSize = {
	[GameLevel.Easy]: { maxWidth: "437px" },
	[GameLevel.Medium]: { maxWidth: "772px" },
	[GameLevel.Hard]: { maxWidth: "1157px" },
	[GameLevel.Impossible]: { maxWidth: "1266px" },
}
export const Board = styled.div<{ level: GameLevel }>`
	width: 100%;
	max-width: ${p => boardSize[p.level === undefined ? GameLevel.Easy : p.level].maxWidth};
`

export const LevelRow = styled.div`
	margin: 5px 0;
	width: 100%;
	max-width: 437px;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 20px;
`

export const LevelButton = styled.button<{ isActive: boolean }>`
	flex: 0 0 100px;
    font-family: 'Press Start 2P', -apple-system, Fira Sans, Helvetica Neue, sans-serif;
	background-color: ${p => p.isActive ? '#958036' : '#dab73b'};
	color: ${p => p.isActive ? 'white' : '#333'};
	min-height: 48px;
	text-transform: uppercase;
`

export const TopBar = styled.div`
	width: 100%;
    height: 60px;
	max-width: 437px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;
`

export const Button = styled.button`
	min-height: 48px;
	min-width: 48px;
	font-size: 1.3em;
`

export const Grid = styled.div<{ disabled: boolean }>`
	overflow: auto;
	align-self: flex-start;
	max-height: 100vh;
	background-color: lightgray;
	display: flex;
	flex-flow: column nowrap;
	gap: 2px;
    border: 2px solid;
	border-spacing: 2px;
    border-color: lightgray;
	opacity: ${p => p.disabled ? 0.8 : 1};
`

export const Row = styled.div`
	display: -webkit-box;
`

const areaSize = {
	[GameLevel.Easy]: { width: '11vw', height: '11vw', fontSize: '1.3em' },
	[GameLevel.Medium]: { width: '6.12vw', height: '6.12vw', fontSize: '1.2em' },
	[GameLevel.Hard]: { width: '4.11vw', height: '4.11vw', fontSize: '1em' },
	[GameLevel.Impossible]: { width: '3.08vw', height: '3.08vw', fontSize: '1em' },
}
export const Area = styled.button<{ isVisible: boolean, level: GameLevel }>`
    font-family: 'Press Start 2P', -apple-system, Fira Sans, Helvetica Neue, sans-serif;
	font-size:  ${p => areaSize[p.level].fontSize};
	height: ${p => areaSize[p.level].height};
	width: ${p => areaSize[p.level].width};
	max-height: 48px;
	max-width: 48px;
	font-weight: bold;
    border:${p => p.isVisible ? '.1px dashed' : '1.5px solid'};
    background-color: ${p => p.isVisible ? '#c0c0c0c3' : '#C0C0C0'};
    border-top-color: ${p => p.isVisible ? '#7B7B7B' : '#ffffff'};
    border-right-color: ${p => p.isVisible ? '#7B7B7B' : '#7B7B7B'};
    border-bottom-color: ${p => p.isVisible ? '#7B7B7B' : '#7B7B7B'};
    border-left-color:  ${p => p.isVisible ? '#7B7B7B' : '#ffffff'};
    padding:  ${p => p.isVisible ? '5px' : '0'};
	display: flex;
    align-items: center;
    justify-content: center;
	cursor: pointer;
`
