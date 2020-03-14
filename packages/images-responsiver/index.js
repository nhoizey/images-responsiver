'use strict';

const jsdom = require("@tbranyen/jsdom");
const { JSDOM } = jsdom;
const deepmerge = require('deepmerge');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

function message(msg) {
  console.log(`[images-responsiver] ${msg}`);
}

const imageResponsiver = (html, options) => {
  // Default settings
  let globalSettings = {
    selector: 'img',
    resizedImageUrl: (src, width) => src.replace(/^(.*)(\.[^\.]+)$/, "$1-" + width + "$2"),
    fallbackWidth: 640,
    minWidth: 320,
    maxWidth: 2560,
    steps: 5,
    sizes: '100vw',
    classes: [],
    attributes: {}
  };

  // Overhide default settings with a "default" preset
  if (options.presets !== undefined && options.presets.default !== undefined) {
    globalSettings = deepmerge(
      globalSettings,
      options.presets.default,
      { arrayMerge: overwriteMerge }
    );
  }

  const DOM = new JSDOM(html);
  const document = DOM.window.document;

  [...document.querySelectorAll(globalSettings.selector)].forEach(image => {
    const imageSrc = image.getAttribute('src');

    // TODO: use the URL API?
    if (!imageSrc.match(/^https?:\/\//)) {
      message(`Image src attribute is not an absolute URL: ${imageSrc}`);
    } else {
      let imageSettings = globalSettings;

      imageSettings.attributes.width = image.getAttribute('width');
      if (imageSettings.attributes.width === null) {
        message(`Images should have a width attribute: ${imageSrc}`);
      } else {
        imageSettings.maxWidth = Math.min(imageSettings.maxWidth, imageSettings.attributes.width);
        imageSettings.fallbackWidth = Math.min(imageSettings.fallbackWidth, imageSettings.attributes.width);
      }

      imageSettings.attributes.height = image.getAttribute('height');
      if (imageSettings.attributes.height === null) {
        message(`Images should have a height attribute: ${imageSrc}`);
      }

      // Overhide settings with presets named in the image classes
      image.classList.forEach(className => {
        if (options.presets[className] !== undefined) {
          imageSettings = deepmerge(
            imageSettings,
            options.presets[className],
            { arrayMerge: overwriteMerge }
          );
        }
      });

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
      image.setAttribute('data-pristine', imageSrc);

      // Add attributes from the preset
      if (Object.keys(imageSettings.attributes).length > 0) {
        for (const attribute in imageSettings.attributes) {
          if (imageSettings.attributes[attribute] !== null) {
            image.setAttribute(attribute, imageSettings.attributes[attribute]);
          }
        }
      }
    }
  });

  return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
};

module.exports = imageResponsiver;