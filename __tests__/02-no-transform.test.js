'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe("image that can't be transformed", () => {
  test('do nothing on SVG image', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.svg"></body></html>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('do nothing on image without a src', () => {
    const content = `<!DOCTYPE html><html><body><img alt="not really an image"></body></html>`;
    const transformed = imagesResponsiver(content);
    const expected = content;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('do nothing on image with already a srcset', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png" srcset="test.png 320w"></body></html>`;
    const transformed = imagesResponsiver(content);
    const expected = content;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
