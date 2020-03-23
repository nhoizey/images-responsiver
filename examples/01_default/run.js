'use strict';

const fs = require('fs');
const imagesResponsiver = require('../../index.js');

const src = fs.readFileSync('./page.html', { encoding: 'utf8' });
const dist = imagesResponsiver(src);
fs.writeFileSync('page-enhanced.html', dist);
