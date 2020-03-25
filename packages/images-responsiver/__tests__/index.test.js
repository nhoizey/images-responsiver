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
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="789"></body>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="543"></body>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('width attribute inferior to the minWidth', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="200"></body>`;
    const transformed = imagesResponsiver(content);
    expect(cleanHtml(transformed)).toMatchSnapshot();
  });

  test('2 images', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test1.png" width="350" /><img src="test2.png" width="400" /></body>`;
    const transformed = imagesResponsiver(content);

    expect(cleanHtml(transformed)).toMatchSnapshot();
  });
});

describe('image with options', () => {
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

describe('advanced options', () => {
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
