const htmlmin = require('html-minifier');
const imagesResponsiver = require('./index');

function mini(html) {
  return htmlmin.minify(html, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    sortAttributes: true,
    minifyCSS: true
  });
}

describe('no image', () => {
  test('keeps intact HTML without image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><p>Hello</p></body></html>`;
    const transformed = imagesResponsiver(content, {});
    const expected = content;
    expect(mini(transformed)).toEqual(mini(expected));
  });
});

describe('image that can\'t be transformed', () => {
  test('do nothing on SVG image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><img src="test.svg"></body></html>`;
    const transformed = imagesResponsiver(content, {});
    const expected = content;
    expect(mini(transformed)).toEqual(mini(expected));
  });
});

describe('image without options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {});
    const expected = `<!DOCTYPE html><html><head></head><body>
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
    expect(mini(transformed)).toEqual(mini(expected));
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="789"></body>`;
    const transformed = imagesResponsiver(content, {});
    const expected = `<!DOCTYPE html><html><head></head><body>
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
    expect(mini(transformed)).toEqual(mini(expected));
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
      <img src="test.png" width="543"></body>`;
    const transformed = imagesResponsiver(content, {});
    const expected = `<!DOCTYPE html><html><head></head><body>
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
    expect(mini(transformed)).toEqual(mini(expected));
  });
});

describe('image with options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><img src="test.png"></body></html>`;
    const transformed = imagesResponsiver(content, {
      presets:
      {
        default: {
          minWidth: 120,
          maxWidth: 320,
          steps: 3
        }
      }
    });
    const expected = `<!DOCTYPE html><html><head></head><body>
      <img
        src="test-640.png"
        srcset="
          test-120.png 120w,
          test-220.png 220w,
          test-320.png 320w"
          sizes="100vw"
          data-pristine="test.png" /></body></html>`;
    expect(mini(transformed)).toEqual(mini(expected));
  });
});