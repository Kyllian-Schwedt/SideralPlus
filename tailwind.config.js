/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      notebook: "480px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      opacity: {
        fade: 0.6,
      },
      fontSize: {
        ms: "10px",
      },
      colors: {
        background: {
          dark: "#101115",
        },
        typography: {
          light: "#D3D3D4",
        },
        card: {
          dark: "#1C1F2A",
        },
        action: {
          brand: "#062794",
          dark: "#222326",
        },
        rated: {
          dark: "#3F4043",
        },
      },
      width: {
        '1/8': '12.5%',
        '1/7': '14.2857143%',
        '1/6': '16.6666667%',
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.3333333%',
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}

