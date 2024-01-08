/** @type {import('tailwindcss').Config} */
import harmonyPalette from "@evilmartians/harmony/tailwind"
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: harmonyPalette,
		extend: {
			fontFamily: {
				sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial Nova', 'Arial', 'system-ui']
			}
		},
	},
	plugins: [
		plugin(({ addUtilities, addBase, theme }) => {
			addBase({
				'a[href], button': {
					'&:hover:not(:disabled)': {
						'background-color': theme('colors[light-grey]')
					},
					'&:active:not(:disabled)': {
						'transform': 'scale(0.95)',
						'background-color': theme('colors[light-grey]')
					},
					'&:focus': {
						'outline': `1px dashed ${theme('colors.black')}`
					}
				},
				'input[type="radio"]:not(:disabled) + label:hover': {
					'background-color': theme('colors[light-grey]')
				},
				'input[type="radio"]:not(:disabled) + label:active': {
					'transform': 'scale(0.95)',
					'background-color': theme('colors[light-grey]')
				},
				'input[type="radio"]:focus + label': {
					'outline': `1px dashed ${theme('colors.black')}`
				},
				'input[type="radio"]:checked + label': {
					'border-color': theme('colors.black')
				},
				'button, input': {
					'&:disabled, &:disabled + label': {
						'cursor': 'not-allowed',
						'opacity': '0.3'
					}
				}
			})
		})
	]
}
