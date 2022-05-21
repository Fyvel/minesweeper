import Link from 'next/link'

export default function Home() {
	return (

		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li>
				<Link href="/minesweeper">
					<a>Minesweeper</a>
				</Link>
			</li>
		</ul>
	)
}
