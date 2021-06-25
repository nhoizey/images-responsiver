'use strict';

const { parseHTML } = require('linkedom');

const deepmerge = require('deepmerge');
const clonedeep = require('lodash.clonedeep');
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
const debug = require('debug');

const error = debug('images-responsiver:error');
const warning = debug('images-responsiver:warning');
const info = debug('images-responsiver:info');

const defaultSettings = {
  selector: ':not(picture) > img[src]:not([srcset]):not([src$=".svg"])',
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

  const { document } = parseHTML(html);

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
      if (image.dataset && 'responsiver' in image.dataset) {
        // TODO: Merging preset settings to previous settings should be easier
        image.dataset.responsiver.split(' ').forEach((preset) => {
          if (options[preset] !== undefined) {
            if ('selector' in options[preset]) {
              error(
                `The 'selector' property can't be used in the '${preset}' preset. It can be used only in the 'default' preset`
              );
              delete options[preset].selector;
            }
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

      const imageWidth = image.getAttribute('width');
      if (imageWidth === null) {
        warning(`The image should have a width attribute: ${imageSrc}`);
      }

      let srcsetList = [];
      if (
        imageSettings.widthsList !== undefined &&
        imageSettings.widthsList.length > 0
      ) {
        // Priority to the list of image widths for srcset
        // Make sure there are no duplicates, and sort in ascending order
        imageSettings.widthsList = [...new Set(imageSettings.widthsList)].sort(
          (a, b) => a - b
        );
        const widthsListLength = imageSettings.widthsList.length;
        if (imageWidth !== null) {
          // Filter out widths superiors to the image's width
          imageSettings.widthsList = imageSettings.widthsList.filter(
            (width) => width <= imageWidth
          );
          if (
            imageSettings.widthsList.length < widthsListLength &&
            (imageSettings.widthsList.length === 0 ||
              imageSettings.widthsList[imageSettings.widthsList.length - 1] !==
                imageWidth)
          ) {
            // At least one value was removed because superior to the image's width
            // Let's replace it/them with the image's width
            imageSettings.widthsList.push(imageWidth);
          }
        }
        // generate the srcset attribute
        srcsetList = imageSettings.widthsList.map(
          (width) =>
            `${imageSettings.resizedImageUrl(imageSrc, width)} ${width}w`
        );
      } else {
        // We don't have a list of widths for srcset, we have to compute them

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

        if (imageWidth !== null) {
          if (imageWidth < imageSettings.minWidth) {
            warning(
              `The image is smaller than minWidth: ${imageWidth} < ${imageSettings.minWidth}`
            );
            imageSettings.minWidth = imageWidth;
          }
          if (imageWidth < imageSettings.fallbackWidth) {
            warning(
              `The image is smaller than fallbackWidth: ${imageWidth} < ${imageSettings.fallbackWidth}`
            );
            imageSettings.fallbackWidth = imageWidth;
          }
        }
        // generate the srcset attribute
        let previousStepWidth = 0;
        for (let i = 0; i < imageSettings.steps; i++) {
          let stepWidth = Math.ceil(
            imageSettings.minWidth +
              ((imageSettings.maxWidth - imageSettings.minWidth) /
                (imageSettings.steps - 1)) *
                i
          );
          if (imageWidth !== null && stepWidth >= imageWidth) {
            warning(
              `The image is smaller than maxWidth: ${imageWidth} < ${imageSettings.maxWidth}`
            );
            srcsetList.push(
              `${imageSettings.resizedImageUrl(
                imageSrc,
                imageWidth
              )} ${imageWidth}w`
            );
            break;
          }
          if (stepWidth === previousStepWidth) {
            // Don't set twice the same image width
            continue;
          }
          previousStepWidth = stepWidth;
          srcsetList.push(
            `${imageSettings.resizedImageUrl(
              imageSrc,
              stepWidth
            )} ${stepWidth}w`
          );
        }
      }

      if (imageSettings.classes.length > 0) {
        image.classList.add(...imageSettings.classes);
      }

      // Change the image source
      image.setAttribute(
        'src',
        imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
      );

      image.setAttribute('srcset', srcsetList.join(', '));

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
