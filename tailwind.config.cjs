const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					'50': '#f3fbf2',
					'100': '#e4f8e0',
					'200': '#c8f0c2',
					'300': '#9ce293',
					'400': '#69cc5c',
					'500': '#44b136',
					'600': '#329227',
					'700': '#2b7322',
					'800': '#265b20',
					'900': '#204b1c',
					'950': '#0c290a',
				},
        'secondary': {
          '50': '#fefde8',
          '100': '#fdfaaa',
          '200': '#fdf58b',
          '300': '#fce848',
          '400': '#f8d617',
          '500': '#e8bd0a',
          '600': '#c99405',
          '700': '#a06908',
          '800': '#84530f',
          '900': '#704413',
          '950': '#422306',
        },


      }
		},
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Lexend Mega',
      body: 'Lexend',
    }
	}
};

module.exports = config;
