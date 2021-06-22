'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('image with simple fallback option', () => {
  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="789"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        fallbackWidth: 480,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><html><body>
      <img src="test.png" width="420"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        fallbackWidth: 480,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
