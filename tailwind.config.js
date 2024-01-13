/** @type {import('tailwindcss').Config} */
import harmonyPalette from "@evilmartians/harmony/tailwind"

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: harmonyPalette,
		extend: {
			fontFamily: {
				sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial Nova', 'Arial', 'system-ui']
			}
		},
	}
}
