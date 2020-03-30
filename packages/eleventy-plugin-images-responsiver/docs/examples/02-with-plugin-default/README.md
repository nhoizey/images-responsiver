# Second example: default behaviour with the plugin

In the folder of the example, run a clean install then build:

```bash
npm ci
npm run build
```

Sources are in `src/` and build is in `dist/`.

Here's what has been added to `.eleventy.js`:

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
eleventyConfig.addPlugin(imagesResponsiver);
```

If you open `dist/index.html` in a browser, no image should be visible (fortunately, there are `alt` attributes…).

_To be continued…_
