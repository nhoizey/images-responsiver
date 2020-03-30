'use strict';

const imagesResponsiver = require('images-responsiver');
let imagesResponsiverOptions;

const imagesResponsiverTransform = (content, outputPath) => {
  if (!outputPath.endsWith('.html')) {
    return content;
  }
  return imagesResponsiver(content, imagesResponsiverOptions);
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
