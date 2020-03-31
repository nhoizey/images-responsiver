const markdownIt = require('markdown-it');
const markdownItAttributes = require('markdown-it-attrs');
const imagesResponsiver = require('eleventy-plugin-images-responsiver');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  eleventyConfig.addPlugin(imagesResponsiver);

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
