'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('image with simple options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        minWidth: 120,
        maxWidth: 320,
        steps: 3,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('simple image with bad number of steps', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        steps: 1,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('simple image with minWidth = maxWidth', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        minWidth: 320,
        maxWidth: 320,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('simple image with minWidth > maxWidth', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        minWidth: 640,
        maxWidth: 320,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="789"></body>`;
    const transformed = imagesResponsiver(content, {
      default: {
        fallbackWidth: 480,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="420"></body>`;
    const transformed = imagesResponsiver(content, {
      default: {
        fallbackWidth: 480,
      },
    });
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
