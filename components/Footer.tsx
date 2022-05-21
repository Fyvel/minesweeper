import styled from "styled-components";

export default function Footer() {
	return (
		<Foot>
			<a href="https://github.com/Fyvel/minesweeper" target="_blank" rel="noopener noreferrer">
				Made with ❤️ by Fyvel
			</a>
		</Foot>
	);
}

const Foot = styled.footer`
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: -apple-system, Fira Sans, Helvetica Neue, sans-serif;
	grid-row-start: 3;
	grid-row-end: 4;

	a {
		color: inherit;
		text-decoration: none;
	}
`