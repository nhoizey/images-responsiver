'use strict';

const imagesResponsiver = require('images-responsiver');
let imagesResponsiverOptions;

const imagesResponsiverTransform = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    return imagesResponsiver(content, imagesResponsiverOptions);
  }
  return content;
};

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    imagesResponsiverOptions = options;
    eleventyConfig.addTransform(
      'imagesResponsiver',
      imagesResponsiverTransform
    );
  },
};
