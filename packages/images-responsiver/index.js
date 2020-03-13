'use strict';

const jsdom = require("@tbranyen/jsdom");
const { JSDOM } = jsdom;
const deepmerge = require('deepmerge');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

function getResizedImageUrl(src, width) {
  return `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width}/${src}`;
}

const imageResponsiver = (html, options) => {
  // Default settings
  let globalSettings = {
    selector: 'img',
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
      console.error('Image src attribute must be an absolute URL');
    } else {
      let imageSettings = globalSettings;

      imageSettings.attributes.width = image.getAttribute('width');
      if (imageSettings.attributes.width === undefined) {
        console.warn('Images in the HTML should have a width attributes for accurate responsiveness');
      }
      imageSettings.attributes.height = image.getAttribute('height');
      if (imageSettings.attributes.height === undefined) {
        console.warn('Images in the HTML should have a height attribute for rendering performance');
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
      image.setAttribute('src', getResizedImageUrl(imageSrc, imageSettings.fallbackWidth));

      // generate the srcset attribute
      let srcset = [];
      for (let i = 0; i < imageSettings.steps; i++) {
        width = Math.ceil(imageSettings.minWidth + (imageSettings.maxWidth - imageSettings.minWidth) / (imageSettings.steps - 1) * i);
        if (imageSettings.attributes.width === undefined || width < imageSettings.attributes.width) {
          srcset.push(`${getResizedImageUrl(imageSrc, width)} ${width}w`);
        } else {
          // Largest image width in srcset should not be above the actual image's width
          srcset.push(`${getResizedImageUrl(imageSrc, imageSettings.attributes.width)} ${imageSettings.attributes.width}w`);
          break;
        }
      }
      image.setAttribute('srcset', srcset.join(', '));

      // add sizes attribute
      image.setAttribute('sizes', imageSettings.sizes);

      // add 'data-pristine' attribute with URL of the pristine image
      image.setAttribute('data-pristine', imageSrc);

      // Add attributes from the preset
      if (Object.keys(imageSettings.attributes).length > 0) {
        for (const attribute in imageSettings.attributes) {
          if (imageSettings.attributes[attribute] !== undefined) {
            image.setAttribute(attribute, imageSettings.attributes[attribute]);
          }
        }
      }
    }
  });

  return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
};

module.exports = imageResponsiver;