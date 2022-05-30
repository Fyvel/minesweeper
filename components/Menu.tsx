import styled from "styled-components";

type MenuProps = {
	open: boolean,
}
export default function Menu({ open }: MenuProps) {

	const isHidden = open ? true : false;
	const tabIndex = isHidden ? 0 : -1;

	return (
		<StyledMenu open={open}>
			<a href="/" tabIndex={tabIndex}>
				<span role="img" aria-label="home">🏠</span>
				Home
			</a>
			<a href="/minesweeper" tabIndex={tabIndex}>
				<span role="img" aria-label="Minesweeper">💣</span>
				Minesweeper
			</a>
		</StyledMenu>
	)
}

const StyledMenu = styled.nav<{ open: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	background: ${({ theme }) => theme.body};
	transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
	height: 100vh;
	text-align: left;
	padding: 3rem 2rem;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	transition: transform 0.3s ease-in-out;

	@media (max-width: ${({ theme }) => theme.mobile}) {
		width: 100%;
		}

	a {
		font-size: 2em;
		text-transform: uppercase;
		padding: 2rem 0;
		font-weight: bold;
		letter-spacing: 0.5rem;
		color: ${({ theme }) => theme.primary};
		text-decoration: none;
		transition: color 0.3s linear;

		@media (max-width: ${({ theme }) => theme.mobile}) {
			font-size: 1.2em;
			letter-spacing: 0.2rem;
			text-align: center;
		}
	}
`