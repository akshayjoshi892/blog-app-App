/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./components/*.{js,jsx,ts,tsx}", "./Screens/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            bg_color: "#F4F9F9",
            bg_card: "#7FC7D9",
            bg_btn: "#365486",
            text_color: "#0F1035",
         },
      },
   },
   plugins: [],
};
