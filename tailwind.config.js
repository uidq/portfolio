import {nextui} from '@nextui-org/theme'

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
  	extend: {
		animation: {
			"spin-slow": "spin 3s linear infinite",
			"accordion-down": {
			  from: {
				height: "0",
			  },
			  to: {
				height: "var(--radix-accordion-content-height)",
			  },
			},
			"accordion-up": {
			  from: {
				height: "var(--radix-accordion-content-height)",
			  },
			  to: {
				height: "0",
			  },
			},
			"fade-in": "fadeIn 0.8s ease-out forwards",
			"fade-in-delay-1": "fadeIn 0.8s ease-out 0.2s forwards",
			"fade-in-delay-2": "fadeIn 0.8s ease-out 0.4s forwards",
			"fade-in-delay-3": "fadeIn 0.8s ease-out 0.6s forwards",
			"fade-in-delay-4": "fadeIn 0.8s ease-out 0.8s forwards",
			"fade-in-delay-5": "fadeIn 0.8s ease-out 1s forwards",
			"expand": "expand 1s ease-out 0.6s forwards",
			"float-1": "float1 6s ease-in-out infinite",
			"float-2": "float2 8s ease-in-out infinite",
			"float-3": "float3 7s ease-in-out infinite",
		},
		backgroundImage: {
			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
		},
		colors: {
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			card: {
			  DEFAULT: "hsl(var(--card))",
			  foreground: "hsl(var(--card-foreground))",
			},
			popover: {
			  DEFAULT: "hsl(var(--popover))",
			  foreground: "hsl(var(--popover-foreground))",
			},
			primary: {
			  DEFAULT: "hsl(var(--primary))",
			  foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
			  DEFAULT: "hsl(var(--secondary))",
			  foreground: "hsl(var(--secondary-foreground))",
			},
			muted: {
			  DEFAULT: "hsl(var(--muted))",
			  foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
			  DEFAULT: "hsl(var(--accent))",
			  foreground: "hsl(var(--accent-foreground))",
			},
			destructive: {
			  DEFAULT: "hsl(var(--destructive))",
			  foreground: "hsl(var(--destructive-foreground))",
			},
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			chart: {
			  "1": "hsl(var(--chart-1))",
			  "2": "hsl(var(--chart-2))",
			  "3": "hsl(var(--chart-3))",
			  "4": "hsl(var(--chart-4))",
			  "5": "hsl(var(--chart-5))",
			},
			sidebar: {
			  DEFAULT: "hsl(var(--sidebar-background))",
			  foreground: "hsl(var(--sidebar-foreground))",
			  primary: "hsl(var(--sidebar-primary))",
			  "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
			  accent: "hsl(var(--sidebar-accent))",
			  "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
			  border: "hsl(var(--sidebar-border))",
			  ring: "hsl(var(--sidebar-ring))",
			},
			pink: {
			  400: "#ff69b4",
			},
		},
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
		  animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
		},
  		fontFamily: {
  			sans: ["var(--font-sans)"],
  			mono: ["var(--font-mono)"]
  		},
  		keyframes: {
			spotlight: {
				"0%": {
				  opacity: 0,
				  transform: "translate(-72%, -62%) scale(0.5)",
				},
				"100%": {
				  opacity: 1,
				  transform: "translate(-50%,-40%) scale(1)",
				},
			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
  			meteor: {
  				'0%': {
  					transform: 'rotate(215deg) translateX(0)',
  					opacity: '1'
  				},
  				'70%': {
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'rotate(215deg) translateX(-500px)',
  					opacity: '0'
  				}
  			},
  			aurora: {
  				from: {
  					backgroundPosition: '50% 50%, 50% 50%'
  				},
  				to: {
  					backgroundPosition: '350% 50%, 350% 50%'
  				}
  			},
			fadeIn: {
				from: {
					opacity: 0,
					transform: "translateY(20px)",
				},
				to: {
					opacity: 1,
					transform: "translateY(0)",
				},
			},
			expand: {
				from: {
					width: "0",
					opacity: 0,
				},
				to: {
					width: "6rem",
					opacity: 1,
				},
			},
			float1: {
				"0%, 100%": {
					transform: "translateY(0px) translateX(0px)",
					opacity: 0.6,
				},
				"50%": {
					transform: "translateY(-20px) translateX(10px)",
					opacity: 1,
				},
			},
			float2: {
				"0%, 100%": {
					transform: "translateY(0px) translateX(0px)",
					opacity: 0.4,
				},
				"50%": {
					transform: "translateY(-15px) translateX(-5px)",
					opacity: 0.8,
				},
			},
			float3: {
				"0%, 100%": {
					transform: "translateY(0px) translateX(0px)",
					opacity: 0.5,
				},
				"50%": {
					transform: "translateY(-25px) translateX(15px)",
					opacity: 1,
				},
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  darkMode: ["class", 'class'],
  plugins: [
    nextui(),
    [addVariablesForColors],
      require("tailwindcss-animate")
],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}