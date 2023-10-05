/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.ejs"
  ],
  theme: {
    extend: {
      colors: {
        "light-gray-100": "#F8F9FA",
        "light-gray-200": "#E9ECEF",
        "light-gray-300": "#DEE2E6",
        "light-gray-400": "#CED4DA",
        "light-gray-500": "#ADB5BD",
        "light-gray-600": "#6C757D",
        "light-gray-700": "#495057",
        "light-gray-800": "#343A40",
        "light-gray-900": "#212529"
      }
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
