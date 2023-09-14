/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			black: 'oklch(20% 0 0)',
			white: 'oklch(100% 0 0)'
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
					'&:focus': {
						'outline': `1px dashed ${theme('colors.black')}`,
						'outline-offset': '2px'
					}
				}
			})

			addComponents({
				'.button-primary': {
					'display': 'inline-flex',
					'justify-content': 'center',
					'align-items': 'center',
					'gap': theme('spacing.2'),
					'padding-left': theme('spacing.6'),
					'padding-right': theme('spacing.6'),
					'padding-top': theme('spacing.3'),
					'padding-bottom': theme('spacing.3'),
					'background-color': theme('colors.black'),
					// 'color': theme('colors.white'), // разобраться почему не работает с цветом
					'user-select': 'none',
					'outline': 'none',
					'border-color': theme('colors.black'),
					'transition': 'outline-color 200ms ease',
					'&:focus:not(:focus-visible)': {
						'outline-color': `transparent`
					}
				}
			})
		})
	]
}
