import Minesweeper from '@/pages/Minesweeper'
import styled from 'styled-components'

export default function Home() {
	return (
		<Column>
			<Minesweeper />
		</Column>
	)
}

const Column = styled.div`
	display: flex;
    flex-flow: column;
    align-items: center;
`