/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'grape': {
					'50': '#f8f5fd',
					'100': '#f0edfa',
					'200': '#e4def6',
					'300': '#d1c3ef',
					'400': '#b9a0e5',
					'500': '#a079d9',
					'600': '#905ccb',
					'700': '#7f4ab7',
					'800': '#6b3d9a',
					'900': '#59347e',
					'950': '#3d235c',
				},

			},
		},
	},
	plugins: [],
}
