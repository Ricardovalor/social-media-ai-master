const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const fs = require('fs');

const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

postcss([tailwindcss, autoprefixer])
  .process(css, { from: undefined })
  .then((result) => {
    fs.writeFileSync('./src/tailwind-output.css', result.css);
    console.log('Tailwind CSS built successfully!');
  })
  .catch((error) => {
    console.error('Error building Tailwind CSS:', error);
  });
