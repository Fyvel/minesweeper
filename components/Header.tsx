import { useOnClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import styled from "styled-components";
import Burger from "./Burger";
import Menu from "./Menu";

export default function Header() {
	const [open, setOpen] = useState(false)
	const node = useRef()
	useOnClickOutside(node, () => setOpen(false))

	return (
		<>
			<Head ref={node}>
				<Burger open={open} setOpen={setOpen} />
				Hello there!
				<Burger open={open} setOpen={setOpen} />
			</Head>
			<Menu open={open} />
		</>
	);
}

const Head = styled.header`
	width: 100%;
	height: 60px;
	display: flex;
	padding: 1rem;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
`