# eleventy-plugin-images-responsiver

[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

`eleventy-plugin-images-responsiver` is **a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`eleventy-plugin-images-responsiver` should be enough for most use cases**, known as Resolution Switching. Read [this article on Cloudfour's blog to know more of the theory](https://cloudfour.com/thinks/responsive-images-the-simple-way/).

This Eleventy plugin allows authors to **use the standard Markdown syntax for images** (`![alt text](image.jpg "title text")`) and yet **get responsive images in the generated HTML**, with `srcset` and `sizes` attributes.

> **Warning**
> This plugin doesn't generate any image, it has to be used either with already existing images, a local image resizing solution (should work with the official [eleventy-img](https://www.11ty.dev/docs/plugins/image/) plugin), or a third party service ("image CDN") like Cloudinary.

# How does it work?

`eleventy-plugin-images-responsiver` is **the glue** between Eleventy plugin and transformations system and [`images-responsiver`](../images-responsiver/), the generic HTML transformation npm package for simple responsive images.

Eleventy uses Markdown-it to transform Markdown content into HTML, and then runs the transform added by `eleventy-plugin-images-responsiver`, which calls `images-responsiver` to actually transform the HTML.

Neither `eleventy-plugin-images-responsiver` nor `images-responsiver` transforms (resize) the image files, there are multiple ways to do so explained in the docs.

# Installation

To install the plugin, install it as a dev dependency in your Eleventy project:

```
npm install eleventy-plugin-images-responsiver --save-dev
```

# Usage

## Step by step tutorial

Instead of jumping directly into the list of features and configuration options, let us take your hand and **guide you through a step by step tutorial** with actual examples.

Let's **[start here](tutorial/00-preparation/#readme)**!

## Direct access

If you already know how to use the plugin and want to **go directly to a section of the tutorial**, here are direct links:

- [Step 0: Get the resources to follow this tutorial](tutorial/00-preparation/#readme)
- [Step 1: Default behaviour without the plugin](tutorial/01-without-plugin/#readme)
- [Step 2: Default behaviour with the plugin](tutorial/02-with-plugin-default/#readme)
- [Step 3: Resized images](tutorial/03-resized-images/#readme)
- [Step 4: Images dimensions](tutorial/04-images-dimensions/#readme)
- [Step 5: Presets](tutorial/05-presets/#readme)
- [Step 6: Presets properties](tutorial/06-presets-properties/#readme)

# Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

# License

This project is licensed under the [MIT License](LICENSE.md).
