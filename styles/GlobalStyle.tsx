import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme; }> `
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
export default GlobalStyle

type Palette = {
	body: string;
	text: string;
	primary: string;
	secondary: string;
	white: string;
	black: string;
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
export const lightTheme: DefaultTheme = {
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
export const darkTheme: DefaultTheme = {
	...lightTheme,
	type: 'dark',
	body: darkPalette.body,
	text: darkPalette.text,
	primary: darkPalette.primary,
	secondary: darkPalette.secondary,
	white: darkPalette.white,
	black: darkPalette.black,
}
