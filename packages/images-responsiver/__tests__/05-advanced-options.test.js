'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('images with advanced options', () => {
  test('selector', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test1.png" /><img src="test2.png" class="notransform" /></body>`;
    const transformed = imagesResponsiver(content, {
      default: {
        selector: 'img:not(.notransform)',
        fallbackWidth: 480,
      },
    });

    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('resizedImageUrl', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="420"></body>`;
    const transformed = imagesResponsiver(content, {
      default: {
        resizedImageUrl: (src, width) => `${src}?w=${width}`,
        fallbackWidth: 480,
      },
    });

    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('runBefore', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png"></body>`;
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
    const content = `<!DOCTYPE html><body>
      <img src="test.png"></body>`;
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
