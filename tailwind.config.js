// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],  // เพิ่ม font prompt
      },
    },
  },
  plugins: [],
};
