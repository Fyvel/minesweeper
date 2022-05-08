import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<title>Hi Mum!</title>
				<Head>
					<meta name="description" content="Old school minesweeper game"/>
					<meta name="viewport" user-scalable="yes" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.webmanifest" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
					<link href="http://fonts.cdnfonts.com/css/common-pixel" rel="stylesheet" />
                
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