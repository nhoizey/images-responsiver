const imagesResponsiver = require('./index');
const prettier = require('prettier');

test('keeps intact HTML without image', () => {
  const content = `<!DOCTYPE html>
<html><head><title>Hello</title></head><body><p>Hello</p></body></html>`;
  const transformedContent = imagesResponsiver(content, {});
  expect(prettier.format(transformedContent, { parser: 'html' })).toEqual(prettier.format(content, { parser: 'html' }));
});

test('HTML with simple image', () => {
  const content = `<!DOCTYPE html>
<html><head><title>Hello</title></head><body><p>Hello</p><p><img src="https://example.com/test.png"></p></body></html>`;
  const transformedContent = imagesResponsiver(content, {});
  expect(prettier.format(transformedContent, { parser: 'html' })).toEqual(prettier.format(content, { parser: 'html' }));
});
