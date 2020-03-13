const imageResponsiver = require('images-responsiver');

const imageResponsiverTransform = (eleventyConfig, options = {}) => {
  eleventyConfig.addTransform('image-responsiver', (content, outputPath) => {
    return imageResponsiver(content, option);
  });
};

module.export = imageResponsiverTransform;