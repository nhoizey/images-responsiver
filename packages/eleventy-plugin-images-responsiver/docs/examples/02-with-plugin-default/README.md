# Step 2: default behaviour with the plugin

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

If you open `dist/index.html` in a browser, no image should be visible (fortunately, there are `alt` attributes! 💪).

Images are not visible because the transformed HTML tells the browsers about images with namse like `colorful-netherlands-880.jpg` while we actualy only have `colorful-netherlands.jpg`.

Let's see how to get these resized images in [step 3](../03-with-plugin-images-urls/).
