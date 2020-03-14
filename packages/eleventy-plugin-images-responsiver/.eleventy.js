const imagesResponsiver = require('images-responsiver');

const imagesResponsiverTransform = (content, outputPath) => {
  if (!outputPath.endsWith(".html")) {
    return content;
  }
  return imagesResponsiver(content, imagesResponsiverOptions);
};

module.exports = {
  initArguments: {},
  configFunction: (eleventyConfig, options = {}) => {
    imagesResponsiverOptions = options;
    eleventyConfig.addTransform('imagesResponsiver', imagesResponsiverTransform);
  },
};