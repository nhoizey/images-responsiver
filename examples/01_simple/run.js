'use strict';

const fs = require('fs');
const imagesResponsiver = require('../../index.js');

const srcHtml = fs.readFileSync('./page.html', { encoding: 'utf8' });
const options = {
  selector: 'img',
  resizedImageUrl: (src, width) => `${src}?w=${width}`,
  presets: {
    default: {
      fallbackWidth: 640,
      minWidth: 320,
      maxWidth: 1280,
      sizes: '(max-width: 44em) 90vw, 40em',
      attributes: {
        loading: 'lazy',
      },
    },
    logo: {
      fallbackWidth: 128,
      minWidth: 58,
      maxWidth: 256,
      steps: 3,
      sizes: '(max-width: 44em) 18vw, 8em',
      classes: ['logo'],
    },
  },
};
const distHtml = imagesResponsiver(srcHtml, options);
fs.writeFileSync('page-responsive.html', distHtml);
