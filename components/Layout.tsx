import { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
	return (
		<Container>
			<Head><Header /></Head>
			<Main>{children}</Main>
			<Foot><Footer /></Foot>
		</Container>
	)
}

const Container = styled.div`
	top:0;
	bottom:0;
	min-height: 100vh;
	min-width: 100vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        '💀'
        '📰'
        '👣';
`

const Head = styled.header`
	grid-area: 💀;
`
const Main = styled.main`
	grid-area: 📰;
`
const Foot = styled.footer`
	grid-area: 👣;
`