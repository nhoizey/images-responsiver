'use strict';

// get dependencies
const fs = require('fs');
const prettier = require('prettier');
const imagesResponsiver = require('../../../index.js');

// get the HTML content of the source file
const src = fs.readFileSync('./page.html', { encoding: 'utf8' });

// run images-responsiver on the source HTML string
const dist = imagesResponsiver(src);

// write the result into a new file
fs.writeFileSync(
  'page-enhanced.html',
  prettier.format(dist, { parser: 'html' })
);
