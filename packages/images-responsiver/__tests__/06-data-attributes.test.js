'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
	return prettier.format(html, { parser: 'html' });
}

describe('data attributes', () => {
	test('both src and data-src, only src used', () => {
		const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" data-src="test3.png" /></body></html>`;
		const transformed = imagesResponsiver(content);

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('both data-src and data-srcset, no action', () => {
		const content = `<!DOCTYPE html><html><body>
      <img data-src="test1.png" data-srcset="test1-300.png 300w, test1-600.png 600w" /></body></html>`;
		const transformed = imagesResponsiver(content);

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('data-src but no src nor data-srcset', () => {
		const content = `<!DOCTYPE html><html><body>
      <img data-src="test.png" width="420"></body></html>`;
		const transformed = imagesResponsiver(content);

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});
});
