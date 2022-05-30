import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/loader.css'
import { useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import GlobalStyle, { lightTheme, darkTheme } from '@/styles/GlobalStyle'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState<DefaultTheme>(lightTheme)

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		const preferedTheme = savedTheme && ['dark', 'light'].includes(savedTheme)
			|| (window.matchMedia
				&& window.matchMedia('(prefers-color-scheme: dark)').matches
				&& 'dark')
			|| (window.matchMedia
				&& window.matchMedia('(prefers-color-scheme: light)').matches
				&& 'light')
		setTheme([darkTheme, lightTheme].find(t => t.type === preferedTheme) || darkTheme)
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle theme={theme} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	)
}

{/* 
	const isDarkTheme = theme.type === 'dark'
	const toggleTheme = () => {
		const updatedTheme = isDarkTheme ? lightTheme : darkTheme
		console.log(" LOG:  >  toggleTheme  >  updatedTheme", updatedTheme)
		setTheme(updatedTheme)
		localStorage.setItem('theme', updatedTheme.type)
	}
<button onClick={toggleTheme}>
{isDarkTheme ?
	<span aria-label="Light mode" role="img">🌞</span> :
	<span aria-label="Dark mode" role="img">🌜</span>}
</button>
 */}
