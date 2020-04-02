module.exports = function (eleventyConfig) {
  const markdownIt = require('markdown-it');
  const markdownItAttributes = require('markdown-it-attrs');
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
