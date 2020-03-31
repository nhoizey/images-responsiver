const markdownIt = require('markdown-it');
const markdownItAttributes = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
