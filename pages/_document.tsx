import Document, { Html, Head, Main, NextScript } from "next/document";
import Footer from "./Footer";
import Header from "./Header";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<title>Hi Mum!</title>
				<Head>
					<meta name="description" content="Old school minesweeper game" />
					<meta name="viewport" user-scalable="yes" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.webmanifest" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
					<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
				</Head>
				<body>
					<header className="header">
						<Header />
					</header>
					<main className="main">
						<Main />
						<NextScript />
					</main>
					<footer className="footer">
						<Footer />
					</footer>
				</body>
			</Html>
		);
	}
}

export default MyDocument;

