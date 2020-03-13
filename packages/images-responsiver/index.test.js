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
    const expected = content;
    const transformed = imagesResponsiver(content, {});
    expect(mini(transformed)).toEqual(mini(expected));
  });
});

describe('image without options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><img src="https://example.com/test.png"></body></html>`;
    const expected = `<!DOCTYPE html><html><head></head><body>
  <img
    src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_640/https://example.com/test.png"
    srcset="
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320/https://example.com/test.png 320w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_880/https://example.com/test.png 880w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_1440/https://example.com/test.png 1440w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_2000/https://example.com/test.png 2000w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_2560/https://example.com/test.png 2560w"
      sizes="100vw"
      data-pristine="https://example.com/test.png" /></body></html>`;
    const transformed = imagesResponsiver(content, {});
    expect(mini(transformed)).toEqual(mini(expected));
  });

  test('width attribute superior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
  <img src="https://example.com/test.png" width="789"></body>`;
    const expected = `<!DOCTYPE html><html><head></head><body>
  <img
    src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_640/https://example.com/test.png"
    width="789"
    srcset="
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320/https://example.com/test.png 320w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_438/https://example.com/test.png 438w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_555/https://example.com/test.png 555w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_672/https://example.com/test.png 672w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_789/https://example.com/test.png 789w"
      sizes="100vw"
      data-pristine="https://example.com/test.png" /></body></html>`;
    const transformed = imagesResponsiver(content, {});
    expect(mini(transformed)).toEqual(mini(expected));
  });

  test('width attribute inferior to the fallback', () => {
    const content = `<!DOCTYPE html><body>
  <img src="https://example.com/test.png" width="543"></body>`;
    const expected = `<!DOCTYPE html><html><head></head><body>
  <img
    src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_543/https://example.com/test.png"
    width="543"
    srcset="
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320/https://example.com/test.png 320w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_376/https://example.com/test.png 376w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_432/https://example.com/test.png 432w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_488/https://example.com/test.png 488w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_543/https://example.com/test.png 543w"
      sizes="100vw"
      data-pristine="https://example.com/test.png" /></body></html>`;
    const transformed = imagesResponsiver(content, {});
    expect(mini(transformed)).toEqual(mini(expected));
  });
});

describe('image with options', () => {
  test('simple image', () => {
    const content = `<!DOCTYPE html><html><head></head><body><img src="https://example.com/test.png"></body></html>`;
    const expected = `<!DOCTYPE html><html><head></head><body>
  <img
    src="https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_640/https://example.com/test.png"
    srcset="
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_120/https://example.com/test.png 120w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_220/https://example.com/test.png 220w,
      https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_320/https://example.com/test.png 320w"
      sizes="100vw"
      data-pristine="https://example.com/test.png" /></body></html>`;
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
    expect(mini(transformed)).toEqual(mini(expected));
  });
});