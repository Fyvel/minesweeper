import { GameLevel } from 'games/MinesweeperGame';
import styled from 'styled-components';

type LevelSelectorProps = {
	onSelect: (level: GameLevel) => void;
};
export default function LevelSelector({ onSelect }: LevelSelectorProps) {
	return (
		<Row>
			<button onClick={() => onSelect(GameLevel.Easy)}>Easy</button>
			<button onClick={() => onSelect(GameLevel.Medium)}>Medium</button>
			<button onClick={() => onSelect(GameLevel.Hard)}>Hard</button>
			<button onClick={() => onSelect(GameLevel.Impossible)}>Impossible</button>
		</Row>
	);
}

export const TopBar = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;
`

export const Grid = styled.div<{ disabled: boolean }>`
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
	display: flex;
	flex-flow: row nowrap;
`

export const Area = styled.button<{ isVisible: boolean }>`
    height: 20px;
    width: 20px;
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
