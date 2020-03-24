'use strict';

const fs = require('fs');
const imagesResponsiver = require('../../../index.js');

const toMB = (bytes) => Math.floor(bytes / 1024 / 1024);

const srcHtml = fs.readFileSync('./page.html', { encoding: 'utf8' });
let distHtml;
let mbUsed;

for (let i = 0; i < 10000; i++) {
  distHtml = imagesResponsiver(srcHtml, {});
  if (!(i % 10)) {
    mbUsed = toMB(process.memoryUsage().heapUsed);
    console.log(`Tracking memory: ${mbUsed} MB at iteration #${i}`);
  }
  // if (mbUsed > 500) {
  //   global.gc();
  // }
}
