/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			black: 'oklch(20% 0 0)',
			white: 'oklch(100% 0 0)',
			grey: 'oklch(55% 0 0)',
			'light-grey': 'oklch(96% 0 0)',
			red: 'oklch(55.17% 0.205 24.53)',
			yellow: 'oklch(85% 0.19 90.38)',
			transparent: 'transparent'
		},
		extend: {
			fontFamily: {
				sans: ['Noto Sans Mono', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [
		plugin(({ addComponents, addUtilities, addBase, theme }) => {
			addBase({
				'a[href], button': {
					'border-radius': theme('spacing[0.5]'),
					'&:focus': {
						'outline': `1px dashed ${theme('colors.black')}`
					},
					'&:hover:not(:disabled)': {
						'background-color': theme('colors[light-grey]')
					},
					'&:active:not(:disabled)': {
						'transform': 'translateY(2px)',
						'background-color': theme('colors[light-grey]')
					}
				},
				'button': {
					'&:disabled': {
						'cursor': 'not-allowed'
					}
				},
				'img': {
					'aspect-ratio': 'attr(width) / attr(height)'
				}
			})

			addUtilities({
				'.actions-show-on-hover': {
					'button': {
						'visibility': 'hidden'
					},
					'&:hover': {
						'button': {
							'visibility': 'visible'
						}
					}
				}
			})

			addComponents({
				'.cart-is-not-empty-indicator': {
					'&::after': {
						'position': 'absolute',
						'top': '2px',
						'right': '10px',
						'content': `'*'`
					}
				},
			})
		})
	]
}
