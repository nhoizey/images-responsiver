module.exports = function (eleventyConfig) {
  const markdownIt = require('markdown-it');
  const markdownItAttributes = require('markdown-it-attrs');
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  const imagesResponsiver = require('eleventy-plugin-images-responsiver');
  const presets = {
    default: {
      sizes: '(max-width: 45em) 90vw, 40em',
    },
    logo: {
      sizes: '(max-width: 45em) 18vw, 8em',
    },
  };
  eleventyConfig.addPlugin(imagesResponsiver, presets);

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
