/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    maxWidth: {
      '1/5': '20%',
      '1/2': '50%',
      '4/5': '95%',
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/forms')],
};
