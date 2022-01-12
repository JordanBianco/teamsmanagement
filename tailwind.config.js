module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'c-white': '#fffffe',
				'c-light-gray': 'rgb(43,48,59)', // #2b303b
				'c-dark-gray': 'rgb(33,37,45)' // 21252d
			},
			spacing: {
				'4.5': '18px',
				'18': '4.5rem',
				'68': '17rem' // 272px
			},
			boxShadow: {
				'custom': '0 10px 15px -3px rgba(211, 211, 211, 0.1)',
			}
		},
	},
	variants: {
		extend: {
			backgroundColor: ['odd', 'even'],
		},
	},
	plugins: [],
}
