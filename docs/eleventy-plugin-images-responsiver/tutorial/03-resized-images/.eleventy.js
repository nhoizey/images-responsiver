module.exports = function (eleventyConfig) {
  const markdownIt = require('markdown-it');
  const markdownItAttributes = require('markdown-it-attrs');
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  const imagesResponsiver = require('eleventy-plugin-images-responsiver');
  eleventyConfig.addPlugin(imagesResponsiver);

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
