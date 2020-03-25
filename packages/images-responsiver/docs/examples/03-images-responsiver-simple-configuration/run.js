'use strict';

// get dependencies
const fs = require('fs');
const prettier = require('prettier');
const imagesResponsiver = require('../../../index.js');

// get the HTML content of the source file
const src = fs.readFileSync('./page.html', { encoding: 'utf8' });

// define images-responsiver options
const options = {
  presets: {
    default: {
      sizes: '(max-width: 45em) 90vw, 40em',
    },
    logo: {
      minWidth: 58,
      maxWidth: 512,
      steps: 3,
      fallbackWidth: 128,
      sizes: '(max-width: 45em) 18vw, 8em',
    },
  },
};

// run images-responsiver on the source HTML string
const dist = imagesResponsiver(src, options);

// write the result into a new file
fs.writeFileSync(
  'page-enhanced.html',
  prettier.format(dist, { parser: 'html' })
);
