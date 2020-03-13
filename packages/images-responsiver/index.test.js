const imagesResponsiver = require('./index');
const prettier = require('prettier');

test('keeps intact HTML without image', () => {
  const content = `<!DOCTYPE html>
<html><head><title>Hello</title></head><body><p>Hello</p></body></html>`;
  const transformedContent = imagesResponsiver(content, {});
  expect(prettier.format(transformedContent, { parser: 'html' })).toEqual(prettier.format(content, { parser: 'html' }));
});

test('HTML with simple image', () => {
  const content = `<!DOCTYPE html><body>
<img src="https://example.com/test.png"></body>`;
  const expectedTransformedContent = `<!DOCTYPE html><body>
<img
  src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_640/https://example.com/test.png"
  srcset="
    https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320/https://example.com/test.png 320w,
    https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_880/https://example.com/test.png 880w,
    https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_1440/https://example.com/test.png 1440w,
    https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_2000/https://example.com/test.png 2000w,
    https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_2560/https://example.com/test.png 2560w"
    sizes="100vw"
    data-pristine="https://example.com/test.png"
    width="null"
    height="null" /></body>`;
  const transformedContent = imagesResponsiver(content, {});
  expect(prettier.format(transformedContent, { parser: 'html' })).toEqual(prettier.format(expectedTransformedContent, { parser: 'html' }));
});
