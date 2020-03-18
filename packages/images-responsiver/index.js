'use strict';

const basicHTML = require('basichtml');
const deepmerge = require('deepmerge');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const imagesResponsiver = (html, options) => {
  // Default settings
  let globalSettings = {
    fallbackWidth: 640,
    minWidth: 320,
    maxWidth: 2560,
    steps: 5,
    sizes: '100vw',
    classes: [],
    attributes: {},
  };

  globalSettings.selector =
    options.selector || ':not(picture) img:not([srcset]):not([src$=".svg"])';

  const defaultResizedImageUrl = (src, width) =>
    src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2');
  globalSettings.resizedImageUrl =
    options.resizedImageUrl || defaultResizedImageUrl;

  const defaultRunBefore = image => image;
  globalSettings.runBefore = options.runBefore || defaultRunBefore;

  const defaultRunAfter = image => image;
  globalSettings.runAfter = options.runAfter || defaultRunAfter;

  // Overhide default settings with a "default" preset
  if (options.presets !== undefined && options.presets.default !== undefined) {
    globalSettings = deepmerge(globalSettings, options.presets.default, {
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
  [...document.querySelectorAll(globalSettings.selector)].forEach(image => {
    globalSettings.runBefore(image);

    const imageSrc = image.getAttribute('src');

    if (imageSrc.match(/\.svg$/)) {
      // Nothing to do with SVG images
      return;
    }

    let imageSettings = globalSettings;

    imageSettings.attributes.width = image.getAttribute('width');
    if (imageSettings.attributes.width !== null) {
      imageSettings.maxWidth = Math.min(
        imageSettings.maxWidth,
        imageSettings.attributes.width
      );
      imageSettings.fallbackWidth = Math.min(
        imageSettings.fallbackWidth,
        imageSettings.attributes.width
      );
    }

    imageSettings.attributes.height = image.getAttribute('height');

    // Overhide settings with presets named in the image classes
    if ('responsiver' in image.dataset) {
      // TODO: Merging preset settings to previous settings should be easier
      image.dataset.responsiver.split(' ').forEach(preset => {
        if (
          options.presets !== undefined &&
          options.presets[preset] !== undefined
        ) {
          let presetClasses = options.presets[preset].classes || [];
          let existingClasses = imageSettings.classes;
          imageSettings = deepmerge(imageSettings, options.presets[preset], {
            arrayMerge: overwriteMerge,
          });
          imageSettings.classes = [...existingClasses, ...presetClasses];
        }
      });
      delete image.dataset.responsiver;
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

    globalSettings.runAfter(image);
  });

  return document.toString();
};

module.exports = imagesResponsiver;
