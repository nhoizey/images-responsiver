# eleventy-plugin-images-responsiver

Global solution for responsive images in Eleventy, allowing authors to use Markdown syntax for image and yet get responsive images in generated HTML.

```javascript
const imagesResponsiverPlugin = require("eleventy-plugin-images-responsiver");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(imagesResponsiverPlugin, {
    presets: {
      default: {
        fallbackWidth: 640,
        minWidth: 320,
        maxWidth: 1600,
        steps: 5,
        attributes: {
          loading: 'lazy'
        }
      },
      logo: {
        minWidth: 120,
        maxWidth: 360,
        steps: 3,
        classes: ['onethirds', 'right']
      }
    }
  });
};
```
