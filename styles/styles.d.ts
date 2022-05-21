import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		type: 'light' | 'dark',
		body: string,
		text: string,
		primary: string,
		secondary: string,
		white: string,
		black: string,
		mobile: string,
		tablet: string,
		laptop: string,
		desktop: string,
	}
}