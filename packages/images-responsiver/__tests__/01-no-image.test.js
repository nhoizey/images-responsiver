'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
  return prettier.format(html, { parser: 'html' });
}

describe('no image', () => {
  test('malformed HTML without image', () => {
    const content = `<p>Hello<br><br>mister<br /></p>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('keeps intact HTML without image', () => {
    const content = `<!DOCTYPE html><html><body><p>Hello</p></body></html>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('keeps intact HTML without image with inline style and custom property', () => {
    const content = `<!DOCTYPE html><html><body><p style="--foo: bar">Hello</p></body></html>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
