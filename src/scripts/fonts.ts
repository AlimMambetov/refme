import localFont from 'next/font/local'

export const inter = localFont({
	src: [
		{
			path: '../../public/fonts/Inter/Inter-VariableFont.ttf',
			weight: '100 900',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-inter',
})

export const spacegrotesk = localFont({
	src: [
		{
			path: '../../public/fonts/Space_Grotesk/SpaceGrotesk-VariableFont.ttf',
			weight: '100 900',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-spacegrotesk',
})





export const allFonts = [
	spacegrotesk.variable,
	inter.variable,
].join(' ')