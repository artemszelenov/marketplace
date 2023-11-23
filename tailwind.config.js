/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			black: 'oklch(20% 0 0)',
			white: 'oklch(100% 0 0)',
			grey: 'oklch(55% 0 0)',
			'grey-100': 'oklch(96% 0 0)',
			'grey-200': 'oklch(90% 0 0)',
			'grey-300': 'oklch(85% 0 0)',
			'grey-400': 'oklch(80% 0 0)',
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
					'&:hover:not(:disabled)': {
						'background-color': theme('colors[light-grey]')
					},
					'&:active:not(:disabled)': {
						'transform': 'translateY(2px)',
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
					'transform': 'translateY(2px)',
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
				},
				'input': {
					'background-color': theme('colors[white]'),
					'border': `1px solid ${theme('colors[black]')}`,
					'border-radius': theme('spacing[0.5]'),
					'&:hover': {
						'background-color': theme('colors[light-grey]')
					},
					'&:focus': {
						'background-color': theme('colors[white]'),
						'outline': `1px dashed ${theme('colors.black')}`,
						'outline-offset': 2
					},
					'&:active': {
						'background-color': theme('colors[white]')
					},
					'&:disabled': {
						'background-color': theme('colors[light-grey]')
					},
				},
				// 'img': {
				// 	'aspect-ratio': 'attr(width) / attr(height)'
				// },
				'p a[href]': {
					'text-decoration': 'underline',
					'text-underline-offset': '0.2em'
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
				},
				'.visually-hidden': {
					'clip': 'rect(0, 0, 0, 0)',
					'white-space': 'nowrap',
					'border-width': '0',
					'width': '1px',
					'height': '1px',
					'margin': '-1px',
					'padding': '0',
					'position': 'absolute',
					'overflow': 'hidden'
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
