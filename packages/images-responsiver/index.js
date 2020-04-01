'use strict';

const basicHTML = require('basichtml');
const deepmerge = require('deepmerge');
const clonedeep = require('lodash.clonedeep');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
const debug = require('debug');

const error = debug('images-responsiver:error');
const warning = debug('images-responsiver:warning');
const info = debug('images-responsiver:info');

const defaultSettings = {
  selector: ':not(picture) img[src]:not([srcset]):not([src$=".svg"])',
  resizedImageUrl: (src, width) =>
    src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2'),
  runBefore: (image) => image,
  runAfter: (image) => image,
  fallbackWidth: 640,
  minWidth: 320,
  maxWidth: 1280,
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

      const imageSrc = image.getAttribute('src');
      info(`Transforming ${imageSrc}`);

      // Make sure there are at least 2 steps for minWidth and maxWidth
      if (imageSettings.steps < 2) {
        warning(
          `Steps should be >= 2: ${imageSettings.steps} step for ${imageSrc}`
        );
        imageSettings.steps = 2;
      }

      // Make sure maxWidth > minWidth
      // (even if there would be no issue in `srcset` order)
      if (imageSettings.minWidth > imageSettings.maxWidth) {
        warning(`Combined options have minWidth > maxWidth for ${imageSrc}`);
        let tempMin = imageSettings.minWidth;
        imageSettings.minWidth = imageSettings.maxWidth;
        imageSettings.maxWidth = tempMin;
      }

      let imageWidth = image.getAttribute('width');
      if (imageWidth === null) {
        warning(`The image should have a width attribute: ${imageSrc}`);
      } else {
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
