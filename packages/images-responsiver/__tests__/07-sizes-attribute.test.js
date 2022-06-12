'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('sizes attribute', () => {
  test('existing sizes attribute is untouched', () => {
    const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" sizes="50vw" /></body></html>`;
    const transformed = imagesResponsiver(content);

    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('existing sizes attribute is overriden', () => {
    const content = `<!DOCTYPE html><html><body>
      <img src="test1.png" sizes="50vw" /></body></html>`;
    const transformed = imagesResponsiver(content, {
      default: {
        sizesOverride: true,
      },
    });

    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
