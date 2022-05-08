import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<title>Hi Mum!</title>
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.webmanifest" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;