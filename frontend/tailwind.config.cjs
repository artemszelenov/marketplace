/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			black: 'oklch(20% 0 0)',
			white: 'oklch(100% 0 0)'
		},
		extend: {
			fontFamily: {
				sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
				// serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif]
			},
		},
	},
	plugins: [],
}
