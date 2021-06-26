# eleventy-plugin-images-responsiver

[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

`eleventy-plugin-images-responsiver` is **a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**. Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

This Eleventy plugin allows authors to **use the standard Markdown syntax for images** (`![alt text](image.jpg "title text")`) and yet **get responsive images in the generated HTML**, with `srcset` and `sizes` attributes.

Learn more in [the detailed documentation](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/).

# Installation

To install and use the plugin, install it as a dev dependency in your Eleventy project:

```
npm install eleventy-plugin-images-responsiver --save-dev
```

# Usage

Instead of jumping directly into the list of features and configuration options, let us take your hand and **guide you through a step by step tutorial** with actual examples.

Let's **[start here](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/00-preparation/)**!

If you already know how to use the plugin and want to **go directly to a section of the tutorial**, here are direct links:

- [Step 0: Get the resources to follow this tutorial](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/00-preparation/)
- [Step 1: Default behaviour without the plugin](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/01-without-plugin/)
- [Step 2: Default behaviour with the plugin](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/02-with-plugin-default/)
- [Step 3: Resized images](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/03-resized-images/)
- [Step 4: Images dimensions](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/04-images-dimensions/)
- [Step 5: Presets](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/05-presets/)
- [Step 6: Presets properties](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/tutorial/06-presets-properties/)

# Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

# Alternatives

To deal with responsive images in Eleventy, there are multiple other plugins:

- [eleventy-img](https://www.11ty.dev/docs/plugins/image/) by Zach Leatherman ([@zachleat](https://twitter.com/zachleat)) is a low level utility to perform build-time image transformations for both vector and raster images, but it doesn't generateany markup
- [eleventy-plugin-respimg](https://www.npmjs.com/package/eleventy-plugin-respimg) by Eric Portis ([@etportis](https://twitter.com/etportis/)) provides a shortcode for responsive images with Cloudinary
- [eleventy-plugin-local-respimg](https://github.com/chromeos/static-site-scaffold-modules/tree/master/modules/eleventy-plugin-local-respimg) by Sam Richard ([@Snugug](https://twitter.com/Snugug/)) provides an Eleventy transform for resizing and optimizing local images

# License

This project is licensed under the [MIT License](LICENSE.md).
