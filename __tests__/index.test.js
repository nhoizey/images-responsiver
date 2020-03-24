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

describe('image without options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content);
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-640.png"
        srcset="
          test-320.png 320w,
          test-880.png 880w,
          test-1440.png 1440w,
          test-2000.png 2000w,
          test-2560.png 2560w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="789"></body>`;
    const transformed = imagesResponsiver(content);
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-640.png"
        width="789"
        srcset="
          test-320.png 320w,
          test-438.png 438w,
          test-555.png 555w,
          test-672.png 672w,
          test-789.png 789w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="543"></body>`;
    const transformed = imagesResponsiver(content);
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-543.png"
        width="543"
        srcset="
          test-320.png 320w,
          test-376.png 376w,
          test-432.png 432w,
          test-488.png 488w,
          test-543.png 543w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});

describe('image with options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      presets: {
        default: {
          minWidth: 120,
          maxWidth: 320,
          steps: 3,
        },
      },
    });
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-640.png"
        srcset="
          test-120.png 120w,
          test-220.png 220w,
          test-320.png 320w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="789"></body>`;
    const transformed = imagesResponsiver(content, {
      presets: {
        default: {
          fallbackWidth: 480,
        },
      },
    });
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-480.png"
        width="789"
        srcset="
          test-320.png 320w,
          test-438.png 438w,
          test-555.png 555w,
          test-672.png 672w,
          test-789.png 789w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="420"></body>`;
    const transformed = imagesResponsiver(content, {
      presets: {
        default: {
          fallbackWidth: 480,
        },
      },
    });
    const expected = `<!DOCTYPE html><html><body>
      <img
        src="test-420.png"
        width="420"
        srcset="
          test-320.png 320w,
          test-345.png 345w,
          test-370.png 370w,
          test-395.png 395w,
          test-420.png 420w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});
