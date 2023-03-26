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
	selector: ':not(picture) > img',
	resizedImageUrl: (src, width) =>
		src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2'),
	runBefore: (image) => image,
	runAfter: (image) => image,
	fallbackWidth: 640,
	minWidth: 320,
	maxWidth: 1280,
	steps: 5,
	sizes: '100vw',
	sizesOverride: false,
	classes: [],
	attributes: {},
};

const imagesResponsiver = (html, options = {}, url = '') => {
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
			// Filter out images with data-responsiver="false"
			if (
				'responsiver' in image.dataset &&
				image.dataset.responsiver === 'false'
			) {
				return false;
			}

			// Filter out images with no src nor data-src
			if (!image.hasAttribute('src') && !('src' in image.dataset)) {
				return false;
			}

			// Filter out images with already a srcset
			if (image.hasAttribute('srcset')) {
				return false;
			}

			// Filter out images with no src and already a data-srcset
			if (!image.hasAttribute('src') && 'srcset' in image.dataset) {
				return false;
			}

			// Filter out images with a SVG src
			if (
				image.hasAttribute('src') &&
				image.getAttribute('src').endsWith('.svg')
			) {
				return false;
			}

			// Filter out images with an Data URI src and no data-src or data-srcset
			//
			// For JS-based lazy loading, we need to use the data-src attribute,
			// but use an inline image as a placeholder to avoid a "broken" image
			if (
				image.hasAttribute('src') &&
				image.getAttribute('src').startsWith('data:image/') &&
				!('src' in image.dataset) &&
				!('srcset' in image.dataset)
			) {
				return false;
			}

			return true;
		})
		.forEach((image) => {
			let imageSettings = clonedeep(globalSettings);

			imageSettings.runBefore(image, document, url);

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

			let isData = false;
			if (!image.hasAttribute('src')) {
				isData = true;
			}

			const imageSrc = isData ? image.dataset.src : image.getAttribute('src');
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
				isData ? 'data-src' : 'src',
				imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
			);

			image.setAttribute(
				isData ? 'data-srcset' : 'srcset',
				srcsetList.join(', ')
			);

			// add sizes attribute
			if (!image.hasAttribute('sizes') || imageSettings.sizesOverride) {
				image.setAttribute('sizes', imageSettings.sizes);
			}

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

			imageSettings.runAfter(image, document, url);
		});

	return document.toString();
};

module.exports = imagesResponsiver;
