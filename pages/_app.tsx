import '@/styles/globals.css'
import '@/styles/loader.css'
import { useEffect, useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import LoadingScreen from './LoadingScreen'

const GlobalStyle = createGlobalStyle``

const theme = {}

function MyApp({ Component, pageProps }) {
	const [showLoader, setShowLoader] = useState(true)
	useEffect(() => {
		setTimeout(() => setShowLoader(false), 3000)
	}, [])

	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				{
					showLoader
						? <LoadingScreen />
						: <Component {...pageProps} />
				}
			</ThemeProvider>
		</>
	)
}

export default MyApp
