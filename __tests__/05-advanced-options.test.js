'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
	return prettier.format(html, { parser: 'html' });
}

describe('images with advanced options', () => {
	test('selector', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" /><img src="test2.png" class="notransform" /></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				selector: 'img:not(.notransform)',
				fallbackWidth: 480,
			},
		});

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test("selector in wrong place don't break it", () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" data-responsiver="transform" class="yes" /><img src="test2.png" data-responsiver="transform" class="no" /></body></html>`;
		const transformed = imagesResponsiver(content, {
			transform: {
				selector: '.yes',
				classes: ['transformed'],
			},
		});

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('resizedImageUrl', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="420"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				resizedImageUrl: (src, width) => `${src}?w=${width}`,
				fallbackWidth: 480,
			},
		});

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('runBefore', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				runBefore: (image, document) => {
					image.setAttribute('src', 'another-test.png');
				},
			},
		});

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('runAfter', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				runAfter: (image, document) => {
					image.dataset.after = 'hello!';
				},
			},
		});

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});
});
