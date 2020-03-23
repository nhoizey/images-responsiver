'use strict';

const fs = require('fs');
const imagesResponsiver = require('../../index.js');

const src = fs.readFileSync('./page.html', { encoding: 'utf8' });
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
const dist = imagesResponsiver(src, options);
fs.writeFileSync('page-enhanced.html', dist);
