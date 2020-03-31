'use strict';

const basicHTML = require('basichtml');
const deepmerge = require('deepmerge');
const clonedeep = require('lodash.clonedeep');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const defaultSettings = {
  selector: ':not(picture) img[src]:not([srcset]):not([src$=".svg"])',
  resizedImageUrl: (src, width) =>
    src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2'),
  runBefore: (image) => image,
  runAfter: (image) => image,
  fallbackWidth: 640,
  minWidth: 320,
  maxWidth: 2560,
  steps: 5,
  sizes: '100vw',
  classes: [],
  attributes: {},
};

const imagesResponsiver = (html, options = {}) => {
  // Default settings
  let globalSettings = defaultSettings;

  // Overhide default settings with a "default" preset
  if (options.default !== undefined) {
    globalSettings = deepmerge(globalSettings, options.default, {
      arrayMerge: overwriteMerge,
    });
  }

  const { document } = basicHTML.init({
    selector: {
      // use the module sizzle, it will be required
      // automatically
      name: 'sizzle',
      // how to retrieve results => querySelectorAll
      $(Sizzle, element, css) {
        return Sizzle(css, element);
      },
    },
  });

  document.documentElement.innerHTML = html;

  [...document.querySelectorAll(globalSettings.selector)]
    .filter((image) => {
      // filter out images without a src, or not SVG, or with already a srcset
      return (
        image.getAttribute('src') !== null &&
        !image.getAttribute('src').match(/\.svg$/) &&
        image.getAttribute('srcset') === null
      );
    })
    .forEach((image) => {
      let imageSettings = clonedeep(globalSettings);

      imageSettings.runBefore(image, document);

      // Overhide settings with presets named in the image classes
      if ('responsiver' in image.dataset) {
        // TODO: Merging preset settings to previous settings should be easier
        image.dataset.responsiver.split(' ').forEach((preset) => {
          if (options[preset] !== undefined) {
            let presetClasses = options[preset].classes || [];
            let existingClasses = imageSettings.classes;
            imageSettings = deepmerge(imageSettings, options[preset], {
              arrayMerge: overwriteMerge,
            });
            imageSettings.classes = [...existingClasses, ...presetClasses];
          }
        });
        delete image.dataset.responsiver;
      }

      // Make sure there are at least 2 steps for minWidth and maxWidth
      if (imageSettings.steps < 2) {
        imageSettings.steps = 2;
      }

      const imageSrc = image.getAttribute('src');

      let imageWidth = image.getAttribute('width');
      if (imageWidth !== null) {
        imageSettings.minWidth = Math.min(imageSettings.minWidth, imageWidth);
        imageSettings.maxWidth = Math.min(imageSettings.maxWidth, imageWidth);
        imageSettings.fallbackWidth = Math.min(
          imageSettings.fallbackWidth,
          imageWidth
        );
      }

      if (imageSettings.classes.length > 0) {
        image.classList.add(...imageSettings.classes);
      }

      // Change the image source
      image.setAttribute(
        'src',
        imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
      );

      // generate the srcset attribute
      let srcset = [];
      for (let i = 0; i < imageSettings.steps; i++) {
        let width = Math.ceil(
          imageSettings.minWidth +
            ((imageSettings.maxWidth - imageSettings.minWidth) /
              (imageSettings.steps - 1)) *
              i
        );
        srcset.push(
          `${imageSettings.resizedImageUrl(imageSrc, width)} ${width}w`
        );
      }
      image.setAttribute('srcset', srcset.join(', '));

      // add sizes attribute
      image.setAttribute('sizes', imageSettings.sizes);

      // add 'data-pristine' attribute with URL of the pristine image
      image.dataset.pristine = imageSrc;

      // Add attributes from the preset
      if (Object.keys(imageSettings.attributes).length > 0) {
        for (const attribute in imageSettings.attributes) {
          if (imageSettings.attributes[attribute] !== null) {
            image.setAttribute(attribute, imageSettings.attributes[attribute]);
          }
        }
      }

      imageSettings.runAfter(image, document);
    });

  return document.toString();
};

module.exports = imagesResponsiver;
