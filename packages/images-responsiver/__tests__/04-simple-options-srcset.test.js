'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
	return prettier.format(html, { parser: 'html' });
}

describe('image with simple srcset options', () => {
	test('simple image', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [120, 180, 320],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with only one value', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [320],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with values duplicates', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [320, 320],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with width superior to all values', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png" width="1280"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [320, 640, 1024],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with width inferior to one value', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png" width="1024"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [320, 800, 1280],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});

	test('simple image with width inferior to all values', () => {
		const content = `<!DOCTYPE html><html><body><img src="test.png" width="400"></body></html>`;
		const transformed = imagesResponsiver(content, {
			default: {
				widthsList: [640, 1024, 1280],
			},
		});
		expect(cleanHtml(transformed)).toMatchSnapshot();
	});
});
