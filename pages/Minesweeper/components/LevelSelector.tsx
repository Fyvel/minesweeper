import { GameLevel } from 'games/MinesweeperGame';
import { useState } from 'react';
import { LevelRow, LevelButton } from './index';

type LevelSelectorProps = {
	onSelect: (level: GameLevel) => void;
};
export default function LevelSelector({ onSelect }: LevelSelectorProps) {
	const [activeLevel, setActiveLevel] = useState<GameLevel>();
	return (
		<LevelRow>
			{Object.keys(GameLevel)
				.map((level) => (
					<LevelButton
						key={level}
						isActive={activeLevel === level}
						onClick={() => {
							setActiveLevel(GameLevel[level]);
							onSelect(GameLevel[level]);
						}}>
						{level}
					</LevelButton>
				))
			}
		</LevelRow>
	);
}
