import styles from '@/styles/Home.module.css'
import Minesweeper from '@/pages/Minesweeper'

export default function Home() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<Minesweeper />
			</main>

			<footer className={styles.footer}>
				<a href="https://github.com/Fyvel" target="_blank" rel="noopener noreferrer">
					Powered with ❤️ by Fyvel
				</a>
			</footer>
		</div>
	)
}
