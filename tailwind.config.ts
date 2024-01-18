import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary" : "#ffffff",
        "greyish":"#F1F5F9",
      },
      fontFamily: {
        "poppins" : "Poppins, sans-serif",
      },
      backgroundColor:{
        BgColor:"#FFFFFF",
        BgColor2:"#DBEAFE"
      }
    },
  },
  plugins: [],
}
export default config
