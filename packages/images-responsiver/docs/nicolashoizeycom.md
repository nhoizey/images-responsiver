| **[<< Back home](/images-responsiver/#documentation)** | **[< Examples](/images-responsiver/examples.html)** |

# Usage on nicolas-hoizey.com

For my own site <https://nicolas-hoizey.com/>, each article has it’s own folder, with the Markdown file and image(s).

For example, [here](https://github.com/nhoizey/nicolas-hoizey.com/tree/master/src/articles/2020/01/10/can-we-monitor-user-happiness-on-the-web-with-performance-tools):

```
src/
  articles/
    2020/
      01/
        10/
          can-we-monitor-user-happiness-on-the-web-with-performance-tools/
            index.md
            speedcurve-user-happiness-monitoring.png
```

I use the same folder hierarchy in the source as in the site, so **I don’t have any permalink to compute** (small performance gain?) for HTML files.

I [added image extensions to `templateFormats`](https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/.eleventy.js#L290) so that Eleventy copy them for me in the same hierarchy:

```javascript
module.exports = function(eleventyConfig) {
  …
  return {
    templateFormats: ['md', 'njk', 'jpg', 'png', 'gif', 'kmz', 'zip', 'scss'],
    …
  };
};
```

Where [I add the plugin](https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/.eleventy.js#L261-L263):

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
const imagesResponsiverConfig = require('./src/_data/images-responsiver-config.js');
eleventyConfig.addPlugin(imagesResponsiver, imagesResponsiverConfig);
```

I use [these options](https://github.com/nhoizey/nicolas-hoizey.com/blob/a441e2972d8cb6bff76697ea596522ec98f5ff76/src/_data/images-responsiver-config.js).

The [`runBefore` hook](https://github.com/nhoizey/nicolas-hoizey.com/blob/a441e2972d8cb6bff76697ea596522ec98f5ff76/src/_data/images-responsiver-config.js#L6-L39) finds images in the page HTML, computes the image dimensions to add the `width`/`height` attributes (good for performance) and the full URL:

```javascript
const runBeforeHook = (image, document) => {
  let documentBody = document.querySelector('body');
  let srcPath = documentBody.getAttribute('data-img-src');
  // TODO: get "dist/" from config
  let distPath = documentBody
    .getAttribute('data-img-dist')
    .replace(/^dist/, '');

  let imageSrc = image.getAttribute('src');

  let imageUrl = '';

  if (imageSrc.match(/^(https?:)?\/\//)) {
    // TODO: find a way to get a remote image's dimensions
    // TODO: some images are local but have an absolute URL
    imageUrl = imageSrc;
  } else {
    let imageDimensions;
    if (imageSrc[0] === '/') {
      // TODO: get "src/" from Eleventy config
      imageDimensions = imageSize('./src' + imageSrc);
      imageUrl = site.url + imageSrc;
    } else {
      // This is a relative URL
      imageDimensions = imageSize(srcPath + imageSrc);
      imageUrl = site.url + distPath + imageSrc;
    }
    image.setAttribute('width', imageDimensions.width);
    image.setAttribute('height', imageDimensions.height);
    image.setAttribute('src', imageUrl);
  }

  image.dataset.responsiver = image.className;
};
```

The plugin then [transforms the URL as I told it](https://github.com/nhoizey/nicolas-hoizey.com/blob/a441e2972d8cb6bff76697ea596522ec98f5ff76/src/_data/images-responsiver-config.js#L73-L74):

```javascript
resizedImageUrl: (src, width) =>
  `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width}/${src}`,
```

Here, I’m using Cloudinary ([sign-up for free](https://nho.io/cloudinary-signup), at least to try) to resize (and optimize) images, so I don’t have to compute any image on my local build.

| **[Examples >](/images-responsiver/examples.html)** | **[Back home >>](/images-responsiver/#documentation)** |
