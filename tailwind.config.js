import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: ["Inter", "sans-serif"]
  		},
  		colors: {
  			primary: {
  				'0': 'rgba(237, 85, 0, 0)',
  				'10': 'rgba(237, 85, 0, 0.1)',
  				'20': 'rgba(237, 85, 0, 0.2)',
  				'30': 'rgba(237, 85, 0, 0.3)',
  				'40': 'rgba(237, 85, 0, 0.4)',
  				'50': 'rgba(237, 85, 0, 0.5)',
  				'60': 'rgba(237, 85, 0, 0.6)',
  				'70': 'rgba(237, 85, 0, 0.7)',
  				'80': 'rgba(237, 85, 0, 0.8)',
  				'90': 'rgba(237, 85, 0, 0.9)',
  				DEFAULT: 'var(--primary-color)'
  			},
  			'home-widget-border': {
  				'0': 'rgba(252, 91, 0, 0)',
  				'10': 'rgba(252, 91, 0, 0.1)',
  				'20': 'rgba(252, 91, 0, 0.2)',
  				'30': 'rgba(252, 91, 0, 0.3)',
  				'40': 'rgba(252, 91, 0, 0.4)',
  				'50': 'rgba(252, 91, 0, 0.5)',
  				'60': 'rgba(252, 91, 0, 0.6)',
  				'70': 'rgba(252, 91, 0, 0.7)',
  				'80': 'rgba(252, 91, 0, 0.8)',
  				'90': 'rgba(252, 91, 0, 0.9)',
  				DEFAULT: 'var(--home-widget-border)'
  			},
  			searchbar: {
  				'0': 'rgba(138, 117, 117, 0)',
  				'10': 'rgba(138, 117, 117, 0.1)',
  				'20': 'rgba(138, 117, 117, 0.2)',
  				'30': 'rgba(138, 117, 117, 0.3)',
  				'40': 'rgba(138, 117, 117, 0.4)',
  				'50': 'rgba(138, 117, 117, 0.5)',
  				'60': 'rgba(138, 117, 117, 0.6)',
  				'70': 'rgba(138, 117, 117, 0.7)',
  				'80': 'rgba(138, 117, 117, 0.8)',
  				'90': 'rgba(138, 117, 117, 0.9)',
  				DEFAULT: 'var(--searchbar-color)'
  			},
  			'restaurant-primary': {
  				'0': 'rgba(90, 0, 132, 0)',
  				'10': 'rgba(90, 0, 132, 0.1)',
  				'20': 'rgba(90, 0, 132, 0.2)',
  				'30': 'rgba(90, 0, 132, 0.3)',
  				'40': 'rgba(90, 0, 132, 0.4)',
  				'50': 'rgba(90, 0, 132, 0.5)',
  				'60': 'rgba(90, 0, 132, 0.6)',
  				'70': 'rgba(90, 0, 132, 0.7)',
  				'80': 'rgba(90, 0, 132, 0.8)',
  				'90': 'rgba(90, 0, 132, 0.9)',
  				DEFAULT: 'var(--restaurant-primary)'
  			},
  			'restaurant-border': {
  				'0': 'rgba(120, 0, 176, 0)',
  				'10': 'rgba(120, 0, 176, 0.1)',
  				'20': 'rgba(120, 0, 176, 0.2)',
  				'30': 'rgba(120, 0, 176, 0.3)',
  				'40': 'rgba(120, 0, 176, 0.4)',
  				'50': 'rgba(120, 0, 176, 0.5)',
  				'60': 'rgba(120, 0, 176, 0.6)',
  				'70': 'rgba(120, 0, 176, 0.7)',
  				'80': 'rgba(120, 0, 176, 0.8)',
  				'90': 'rgba(120, 0, 176, 0.9)',
  				DEFAULT: 'var(--restaurant-border)'
  			},
  			'location-btn-border': {
  				'0': 'rgba(55, 135, 255, 0)',
  				'10': 'rgba(55, 135, 255, 0.1)',
  				'20': 'rgba(55, 135, 255, 0.2)',
  				'30': 'rgba(55, 135, 255, 0.3)',
  				'40': 'rgba(55, 135, 255, 0.4)',
  				'50': 'rgba(55, 135, 255, 0.5)',
  				'60': 'rgba(55, 135, 255, 0.6)',
  				'70': 'rgba(55, 135, 255, 0.7)',
  				'80': 'rgba(55, 135, 255, 0.8)',
  				'90': 'rgba(55, 135, 255, 0.9)',
  				DEFAULT: 'var(--location-button-border)'
  			},
  			'x-icon-bg': {
  				'0': 'rgba(255, 0, 0, 0)',
  				'10': 'rgba(255, 0, 0, 0.1)',
  				'20': 'rgba(255, 0, 0, 0.2)',
  				'30': 'rgba(255, 0, 0, 0.3)',
  				'40': 'rgba(255, 0, 0, 0.4)',
  				'50': 'rgba(255, 0, 0, 0.5)',
  				'60': 'rgba(255, 0, 0, 0.6)',
  				'70': 'rgba(255, 0, 0, 0.7)',
  				'80': 'rgba(255, 0, 0, 0.8)',
  				'90': 'rgba(255, 0, 0, 0.9)',
  				DEFAULT: 'var(--x-icon-background)'
  			}
  		},
  		backgroundImage: {
  			'home-widget': 'var(--home-widget-background)',
  			'home-dropdown': 'var(--home-dropdown-background)',
  			'location-btn': 'var(--location-button-background)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		screens: {
  			xs: '420px'
  		}
  	}
  },
  plugins: [tailwindAnimate],
};
