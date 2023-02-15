const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Unbounded', ...defaultTheme.fontFamily.sans],
			},
			borderWidth: {
				3: '3px',
			},
			borderRadius: {
				DEFAULT: '10px',
			},
			boxShadow: {
				DEFAULT: '5px 5px 0px #000000',
			},
			colors: {
				beige: '#E2E8E4',
			},
		},
	},
	plugins: [],
};
