# eleventy-plugin-images-responsiver

[![GitHub stars](https://img.shields.io/github/stars/nhoizey/eleventy-plugin-images-responsiver.svg?style=social)](https://github.com/nhoizey/eleventy-plugin-images-responsiver/stargazers)

**`eleventy-plugin-images-responsiver` is a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**.

It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg "title text")`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`eleventy-plugin-images-responsiver` should be enough for most use cases**.

# eleventy-plugin-images-responsiver is the glue between Eleventy and images-responsiver

`eleventy-plugin-images-responsiver` is "just" a thin layer between Eleventy plugin and transformations system and [`images-responsiver`](https://github.com/nhoizey/images-responsiver), a generic HTML transformation Node.js module for simple responsive images.

Eleventy uses Markdown-it to transform Markdown content into HTML, and then runs the transform added by `eleventy-plugin-images-responsiver`, which calls `images-responsiver` to actually transform the HTML.

Neither `eleventy-plugin-images-responsiver` nor `images-responsiver` transform (resize) the image files, there are [multiple ways to do so](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html).

**Be aware that [documentation for `images-responsiver`](https://nhoizey.github.io/images-responsiver/) contains a lot more information than this one, but is fully applicable to using `eleventy-plugin-images-responsiver` with Eleventy.**

# Documentation

Read full documentation on <https://nhoizey.github.io/eleventy-plugin-images-responsiver/>

# Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/eleventy-plugin-images-responsiver/contributors) who participated in this project.

# Alternatives

To deal with responsive images in Eleventy, there are multiple other plugins:

- [eleventy-plugin-respimg](https://www.npmjs.com/package/eleventy-plugin-respimg) by Eric Portis ([@etportis](https://twitter.com/etportis/)) provides a shortcode for responsive images with Cloudinary
- [eleventy-plugin-local-respimg](https://github.com/chromeos/static-site-scaffold-modules/tree/master/modules/eleventy-plugin-local-respimg) by Sam Richard ([@Snugug](https://twitter.com/Snugug/)) provides an Eleventy transform for resizing and optimizing local images

# License

This project is licensed under the [MIT License](LICENSE.md).
