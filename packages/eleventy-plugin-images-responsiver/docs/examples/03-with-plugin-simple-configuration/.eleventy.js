module.exports = function (eleventyConfig) {
  const markdownIt = require('markdown-it');
  const markdownItAttributes = require('markdown-it-attrs');
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  const imagesResponsiver = require('eleventy-plugin-images-responsiver');
  eleventyConfig.addPlugin(imagesResponsiver, {
    default: {
      resizedImageUrl: (src, width) =>
        `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width}/${src}`,
    },
  });

  eleventyConfig.addPassthroughCopy('src/assets');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
