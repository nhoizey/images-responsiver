'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('no image', () => {
  test('keeps intact HTML without image', () => {
    const content = `<!DOCTYPE html><html><body><p>Hello</p></body></html>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
