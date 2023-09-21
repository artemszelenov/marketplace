/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			black: 'oklch(20% 0 0)',
			white: 'oklch(100% 0 0)',
			gray: 'oklch(55% 0 0)',
			transparent: 'transparent'
		},
		extend: {
			fontFamily: {
				sans: ['Noto Sans Mono', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [
		plugin(({ addComponents, addBase, theme }) => {
			addBase({
				'a[href], button': {
					'border-radius': theme('spacing[0.5]'),
					'&:focus': {
						'outline': `1px dashed ${theme('colors.black')}`,
						'outline-offset': '4px'
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
				}
			})
		})
	]
}
