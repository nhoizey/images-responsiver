# Step 3: define resized images URLs

In the folder of the example, run a clean install then build:

```bash
npm ci
npm run build
```

Sources are in `src/` and build is in `dist/`.

Here's what has been added to `.eleventy.js`:

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
eleventyConfig.addPlugin(imagesResponsiver, {
  default: {
    resizedImageUrl: (src, width) => `${src}`,
    steps: 1,
  },
});
```

If you open `dist/index.html` in a browser, images should be back.

_To be continued…_
