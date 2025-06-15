/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //Este array estaba bacío, le puse esto siguiedo la documenteación de "tailwind", que instalé en el teminal para poder usar ("npm i -D tailwindcss postcss autoprefixer"). Lo que hace es darle acceso a los estilos de 'tailwind' al archivo "index.html", y todos los archivos que esten dentro de la carpeta "src" y que terminen con "js,ts,jsx,tsx".
  theme: {
    extend: {},
  },
  plugins: [],
}

