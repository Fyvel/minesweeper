import Layout from '@/components/Layout'
import '@/styles/globals.css'
import '@/styles/loader.css'
import { useEffect, useState } from 'react'
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
	body {
		background:${p => p.theme.body};
		color:${p => p.theme.text};
		transition: background 0.2s ease-in, color 0.2s ease-in;
		
			header,
			footer {
				background: ${p => p.theme.body};
				color: ${p => p.theme.text};
			}

			button{
				background: ${p => p.theme.primary};
				color: ${p => p.theme.text};
			}
	}
`

type Palette = {
	body: string,
	text: string,
	primary: string,
	secondary: string,
	white: string,
	black: string,
}

const lightPalette: Palette = {
	body: '#EDF2F4',
	text: '#2B2D42',
	primary: '#D90429',
	secondary: '#8D99AE',
	white: '#EFFFFA',
	black: '#0D0C1D',
}

const darkPalette: Palette = {
	body: '#2B2D42',
	text: '#EDF2F4',
	primary: '#EF233C',
	secondary: '#8D99AE',
	white: '#EFFFFA',
	black: '#0D0C1D',
}

const lightTheme: DefaultTheme = {
	type: 'light',
	body: lightPalette.body,
	text: lightPalette.text,
	primary: lightPalette.primary,
	secondary: lightPalette.secondary,
	white: lightPalette.white,
	black: lightPalette.black,
	mobile: '600px',
	tablet: '960px',
	laptop: '1280px',
	desktop: '1800px',
}

const darkTheme: DefaultTheme = {
	...lightTheme,
	type: 'dark',
	body: darkPalette.body,
	text: darkPalette.text,
	primary: darkPalette.primary,
	secondary: darkPalette.secondary,
	white: darkPalette.white,
	black: darkPalette.black,
}

export default function MyApp({ Component, pageProps }) {
	const [theme, setTheme] = useState<DefaultTheme>(lightTheme)

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		const preferedTheme = ['dark', 'light'].includes(savedTheme)
			&& savedTheme
			|| (window.matchMedia
				&& window.matchMedia('(prefers-color-scheme: dark)').matches
				&& 'dark')
			|| (window.matchMedia
				&& window.matchMedia('(prefers-color-scheme: light)').matches
				&& 'light')
		console.log(" LOG:  >  useEffect  >  setTheme", preferedTheme)
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
