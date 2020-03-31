const markdownIt = require('markdown-it');
const markdownItAttributes = require('markdown-it-attrs');
const imagesResponsiver = require('eleventy-plugin-images-responsiver');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAttributes));

  // My Cloudinary cloudname
  const cloudinaryCloudname = 'nho';

  // Base URL for Cloudinary's fetch API
  const cloudinaryPrefix = `https://res.cloudinary.com/${cloudinaryCloudname}/image/fetch`;

  // Base URL where the pristine image is hosted
  // Should be much shorter on an actual website
  const pristineImageUrlPrefix =
    'https://nhoizey.github.io/eleventy-plugin-images-responsiver/examples/03-with-plugin-images-urls/src';

  const presets = {
    default: {
      resizedImageUrl: (src, width) =>
        `${cloudinaryPrefix}/w_${width}/${pristineImageUrlPrefix}/${src}`,
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
