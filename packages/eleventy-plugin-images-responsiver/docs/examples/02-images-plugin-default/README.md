# First example: default behaviour without the plugin

Install then build:

```bash
npm install
npm run build
```

Sources are in `src/` and build is in `dist/`.

Here's what has been added to `.eleventy.js`:

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
eleventyConfig.addPlugin(imagesResponsiver);
```

If you open `dist/index.html` in a browser, no image should be visible (fortunately, there are `alt` attributes…).
