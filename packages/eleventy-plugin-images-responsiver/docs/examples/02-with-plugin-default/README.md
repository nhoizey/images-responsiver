# Step 2: default behaviour with the plugin

## Run it

In the folder of the example, run a clean install then build:

```bash
npm ci
npm run build
```

Sources are in `src/` and build is in `dist/`.

## Check the result

If you open `dist/index.html` in a browser, no image should be visible… 😅

Fortunately, there are `alt` attributes! 💪

## How does it work? (even if you might think it is not)

Here's what has been added to `.eleventy.js`:

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
eleventyConfig.addPlugin(imagesResponsiver);
```

Images are not visible because the transformed HTML tells the browsers about images with names like `colorful-netherlands-880.jpg` while we actualy only have `colorful-netherlands.jpg`.

Let's see how to get these resized images in [step 3](../03-with-plugin-images-urls/).
