import Document, {
	Html, Head, Main,
	NextScript, DocumentContext, DocumentInitialProps
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet()
		try {
			const originalRenderPage = ctx.renderPage
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

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
					<meta name="theme-color" content="#333" />
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

