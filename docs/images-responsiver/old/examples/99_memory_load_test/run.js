'use strict';

// get dependencies
const fs = require('fs');
const imagesResponsiver = require('../../../index.js');

const toMB = (bytes) => Math.floor(bytes / 1024 / 1024);

// get the HTML content of the source file
const src = fs.readFileSync('./page.html', { encoding: 'utf8' });

let dist;
let mbUsed;

// make loops to track memory usage
for (let i = 0; i < 10000; i++) {
  dist = imagesResponsiver(src, {});
  if (!(i % 10)) {
    mbUsed = toMB(process.memoryUsage().heapUsed);
    console.log(`Tracking memory: ${mbUsed} MB at iteration #${i}`);
  }
}
