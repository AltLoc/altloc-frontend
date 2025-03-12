/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
      extend: {
        screens: {
          ss: "360px",
          xs: "480px",
        },
        container: {
          center: true,
          screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
          },
        },
      
      },
    },
    plugins: [],
  }