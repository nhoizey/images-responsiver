'use strict';

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
    attributes: {}
  };

  globalSettings.selector = options.selector || ':not(picture) img:not([srcset]):not([src$=".svg"])';

  const defaultResizedImageUrl = (src, width) => src.replace(/^(.*)(\.[^\.]+)$/, "$1-" + width + "$2");
  globalSettings.resizedImageUrl = options.resizedImageUrl || defaultResizedImageUrl;

  // Overhide default settings with a "default" preset
  if (options.presets !== undefined && options.presets.default !== undefined) {
    globalSettings = deepmerge(
      globalSettings,
      options.presets.default,
      { arrayMerge: overwriteMerge }
    );
  }

  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  let DOM = new JSDOM(html);
  let document = DOM.window.document;

  [...document.querySelectorAll(globalSettings.selector)].forEach(image => {
    const imageSrc = image.getAttribute('src');

    if (imageSrc.match(/\.svg$/)) {
      message(`Nothing to do with SVG: ${imageSrc}`);
      return;
    }

    let imageSettings = globalSettings;

    imageSettings.attributes.width = image.getAttribute('width');
    if (imageSettings.attributes.width !== null) {
      imageSettings.maxWidth = Math.min(imageSettings.maxWidth, imageSettings.attributes.width);
      imageSettings.fallbackWidth = Math.min(imageSettings.fallbackWidth, imageSettings.attributes.width);
    }

    imageSettings.attributes.height = image.getAttribute('height');

    // Overhide settings with presets named in the image classes
    if ('responsiver' in image.dataset) {
      // TODO: Merging preset settings to previous settings should be easier
      image.dataset.responsiver.split(' ').forEach(preset => {
        if (options.presets[preset] !== undefined) {
          let presetClasses = options.presets[preset].classes || [];
          let existingClasses = imageSettings.classes;
          imageSettings = deepmerge(
            imageSettings,
            options.presets[preset],
            { arrayMerge: overwriteMerge }
          );
          imageSettings.classes = [...existingClasses, ...presetClasses];
        }
      });
      delete image.dataset.responsiver;
    }

    if (imageSettings.classes.length > 0) {
      image.classList.add(...imageSettings.classes);
    }

    // Change the image source
    image.setAttribute('src', imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth));

    // generate the srcset attribute
    let srcset = [];
    for (let i = 0; i < imageSettings.steps; i++) {
      let width = Math.ceil(imageSettings.minWidth + (imageSettings.maxWidth - imageSettings.minWidth) / (imageSettings.steps - 1) * i);
      srcset.push(`${imageSettings.resizedImageUrl(imageSrc, width)} ${width}w`);
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
  });

  let modifiedHtml = DOM.serialize();
  DOM.window.close();
  DOM = null;

  return modifiedHtml;
};

module.exports = imagesResponsiver;