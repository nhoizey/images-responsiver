'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
	return prettier.format(html, { parser: 'html' });
}

describe('image without options', () => {
	test('simple image', () => {
		const content = `<!DOCTYPE html><html><body><p>content before <img src="test.png"> content after</p></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image in subfolder', () => {
		const content = `<!DOCTYPE html><html><body><p>content before <img src="folder/test.png"> content after</p></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with absolute URL', () => {
		const content = `<!DOCTYPE html><html><body><p>content before <img src="https://example.com/folder/test.png"> content after</p></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('width attribute superior to the fallback', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="789"></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('width attribute inferior to the fallback', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="543"></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('width attribute inferior to the minWidth', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="200"></body></html>`;
		const transformed = imagesResponsiver(content);
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('2 images', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" width="350" /><img src="test2.png" width="400" /></body></html>`;
		const transformed = imagesResponsiver(content);

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});
});
