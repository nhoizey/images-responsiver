# eleventy-plugin-images-responsiver

[![GitHub stars](https://img.shields.io/github/stars/nhoizey/eleventy-plugin-images-responsiver.svg?style=social)](https://github.com/nhoizey/eleventy-plugin-images-responsiver/stargazers)

**`eleventy-plugin-images-responsiver` is a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**.

It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg "title text")`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`eleventy-plugin-images-responsiver` should be enough for most use cases**.

# `eleventy-plugin-images-responsiver` is the glue between Eleventy and `images-responsiver`

`eleventy-plugin-images-responsiver` is "just" a thin layer between Eleventy plugin and transformations system and [`images-responsiver`](https://github.com/nhoizey/images-responsiver), a generic HTML transformation Node.js module for simple responsive images.

Eleventy uses Markdown-it to transform Markdown content into HTML, and then runs the transform added by `eleventy-plugin-images-responsiver`, which calls `images-responsiver` to actually transform the HTML.

Neither `eleventy-plugin-images-responsiver` nor `images-responsiver` transform (resize) the image files, there are [multiple ways to do so](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html).

**Be aware that [documentation for `images-responsiver`](https://nhoizey.github.io/images-responsiver/) contains a lot more information than this one, but is fully applicable to using `eleventy-plugin-images-responsiver` with Eleventy.**

# Installation

To install and use the plugin, install it as a dev dependency in your Eleventy project:

```
npm install eleventy-plugin-images-responsiver --save-dev
```

If you use `markdown-it` for Markdown computing (the default in Eleventy), you should add [the great `markdown-it-attrs` plugin](https://github.com/arve0/markdown-it-attrs) to be able to add ids, classes and other attributes to your Markdown images. See [how to add a markdown-it plugin in Eleventy](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins).

For example, `![My logo](my-logo.png){.logo}` will be transformed to `<img src="my-logo" alt="My logo" class="logo" />` in the HTML.

# Usage

## Default behavior without the plugin

Let's say you have this Markdown file (could be [another template format](https://www.11ty.dev/docs/languages/), Eleventy won't judge you) with YAML Front Matter: `my-illustrated-post.md`

```markdown
---
title: eleventy-plugin-images-responsiver
layout: post.njk
---

![My logo](my-logo.png){.logo}

Here is a simple image:

![A photo of colorful houses in Groningen, The Netherlands](colorful-netherlands.jpg)
```

Notice that it uses the `markdown-it-attrs` plugin to be able to add a `logo` class to the image, as suggested in the [installation](#installation).

Add this Eleventy layout (using Nunjucks, but it doesn't really matter) to build an HTML page: `post.njk`

<!-- {% raw %} -->

```nunjucks
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ title }}</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="container">
    <h1>{{ title }}</h1>
    {{ content | safe }}
  </div>
</body>

</html>
```

<!-- {% endraw %} -->

And this CSS file: `styles.css`

```css
img {
  max-width: 100%;
  height: auto;
}

.container {
  width: 90vw;
  max-width: 40em;
  margin: 0 auto;
}

.logo {
  max-width: 20%;
  float: right;
  margin: 0 0 1em 1em;
}
```

We want the content to occupy 90% of the available space (but no more than `40em`, better for readability of multi-lines text), and the logo to use 20% of this content width, floated on the right.

Without the plugin, the HTML for the page would be:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>eleventy-plugin-images-responsiver</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div class="container">
      <h1>eleventy-plugin-images-responsiver</h1>
      <img src="my-logo.png" alt="My logo" class="logo" />
      <p>Here is a simple image:</p>
      <p>
        <img
          src="colorful-netherlands.jpg"
          alt="A photo of colorful houses in Groningen, The Netherlands"
        />
      </p>
    </div>
  </body>
</html>
```

The page looks exactly how you want, thanks to the clean HTML structure and the CSS rules.

But each image is available in only one single dimension (large probably), even if people with many different devices/browsers, with different viewport widths, would rather download only what's necessary.

## Enhanced behavior with the plugin, but no specific configuration

Now add the plugin in your `.eleventy.js` configuration file, without any configuration:

```javascript
const imagesResponsiver = require('eleventy-plugin-images-responsiver');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(imagesResponsiver);
};
```

_Note: Be careful, this plugin defines a transform, and [Eleventy transforms](https://www.11ty.dev/docs/config/#transforms) are run in their declaration order._

The body of the HTML from above is then transformed to this one:

```html
<div class="container">
  <h1>eleventy-plugin-images-responsiver</h1>
  <img
    src="my-logo-640.png"
    class="logo"
    srcset="
      my-logo-320.jpg   320w,
      my-logo-880.jpg   880w,
      my-logo-1440.jpg 1440w,
      my-logo-2000.jpg 2000w,
      my-logo-2560.jpg 2560w
    "
    sizes="100vw"
    data-pristine="my-logo.png"
  />
  <p>Here is a simple image:</p>
  <p>
    <img
      src="colorful-netherlands-640.jpg"
      srcset="
        colorful-netherlands-320.jpg   320w,
        colorful-netherlands-880.jpg   880w,
        colorful-netherlands-1440.jpg 1440w,
        colorful-netherlands-2000.jpg 2000w,
        colorful-netherlands-2560.jpg 2560w
      "
      alt="A photo of colorful houses in Groningen, The Netherlands"
      sizes="100vw"
      data-pristine="colorful-netherlands.jpg"
    />
  </p>
</div>
```

The situation is already better, because users with small viewports (and reasonable screen densities) will download smaller images.

But there are a few issues…

As already said `eleventy-plugin-images-responsiver` is "just a gateway" between Eleventy and [`images-responsiver`](https://github.com/nhoizey/images-responsiver).

Read more about the limits of the plugin's default behavior, and how to add some configuration to enhance it (a lot), in [`images-responsiver` tutorial](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html).

You'll see that you can define presets to define how different kind of images should be transformed. Once again, `markdown-it-attrs` will let content authors add the data attribute `data-responsiver` to their images when they want to chose a preset.

So for example, to add a `logo` preset to the logo image, change the Markdown for the logo from:

```markdown
![My logo](my-logo.png){.logo}
```

To:

```markdown
![My logo](my-logo.png){.logo}{data-responsiver=logo}
```

Additionnaly, you migth need to add a `width` attribute to the images for the plugin to work at its best capacity. You can add this attribute multiple ways:

- manually in Markdown content with `{width=400}`:

  `![My logo](my-logo.png){.logo}{data-responsiver=logo}`

  becomes

  `![My logo](my-logo.png){.logo}{data-responsiver=logo}{width=400}`

  Pretty cumbersome.

- use the [`markdown-it-imsize` plugin](https://github.com/tatsy/markdown-it-imsize) with the `autofill` option, so that image width and height are added automatically (not tested yet)
- or use the `runBefore` hook in the plugin options to run a function that will add these width and height before any responsive transformation. That's [what I currently do for my site](https://nhoizey.github.io/images-responsiver/nicolashoizeycom.html).

Once again, you can learn (much) more in [`images-responsiver` documentation](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html), everything applies also to `eleventy-plugin-images-responsiver`.

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/eleventy-plugin-images-responsiver/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
