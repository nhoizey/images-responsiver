# Step 3: define resized images URLs

## Run it

In the folder of the example, run a clean install then build:

```bash
npm ci
npm run build
```

Sources are in `src/` and build is in `dist/`.

## Check the result

If you open `dist/index.html` in a browser, images should be back.

## How does it work?

I chose to use Cloudinary to resize images, because I know it, and it is easier for this documentation, but you can use other solutions as explained in [`images-responsiver` documentation](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html#using-an-image-cdn).

Here's what has been changed in `.eleventy.js` to use Cloudinary to resize images:

```javascript
// My Cloudinary cloudname
const cloudinaryCloudname = 'nho';

// Base URL for Cloudinary's fetch API
const cloudinaryPrefix = `https://res.cloudinary.com/${cloudinaryCloudname}/image/fetch`;

// Base URL where the pristine image is hosted
// Should be much shorter on an actual website
const pristineImageUrlPrefix =
  'https://nhoizey.github.io/eleventy-plugin-images-responsiver/examples/03-with-plugin-images-urls/src';

const presets = {
  default: {
    resizedImageUrl: (src, width) =>
      `${cloudinaryPrefix}/w_${width}/${pristineImageUrlPrefix}/${src}`,
  },
};

eleventyConfig.addPlugin(imagesResponsiver, presets);
```

If works, even on your own computer, because it uses my Cloudinary account (the `nho` part in `cloudinaryPrefix` is my Cloudinary `cloudname`), which allows transforming images which URL are on the `nhoizey.github.io` domain, even if the page is not there.

The `w_${width}` part in the generated URL is using Cloudinary's `width` transformation ([reference](https://cloudinary.com/documentation/image_transformation_reference#width_parameter)) and is enough

_To be continued…_
