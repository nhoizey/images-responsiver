# eleventy-plugin-images-responsiver

[![Build Status](https://travis-ci.org/nhoizey/eleventy-plugin-images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/eleventy-plugin-images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/eleventy-plugin-images-responsiver.svg?style=social)](https://github.com/nhoizey/eleventy-plugin-images-responsiver/stargazers)

**`eleventy-plugin-images-responsiver` is a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**.

It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg "caption text")`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`eleventy-plugin-images-responsiver` should be enough for most use cases**.

`eleventy-plugin-images-responsiver` is "just" a thin layer between Eleventy plugin and transformations system and [images-responsiver](https://github.com/nhoizey/images-responsiver), a generic HTML transformation Node.js module for simple responsive images.

## Documentation

- [Installation](./installation.html)
- [Usage](./usage.html)
- [Examples](./examples.html)

*To be continued…*

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/eleventy-plugin-images-responsiver/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
