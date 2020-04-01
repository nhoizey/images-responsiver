# images-responsiver

[![Build Status](https://travis-ci.org/nhoizey/images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

**`images-responsiver` is a simple solution for most responsive images needs**.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

`images-responsiver` transforms simple `<img src="…">` HTML tags into better responsive images syntax with `srcset` and `sizes` attributes.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`images-responsiver` should be enough for most use cases**.

`images-responsiver` is also available as a plugin for [Eleventy](https://www.11ty.dev/), a great Static Site Generator: [eleventy-plugin-images-responsiver](https://github.com/nhoizey/eleventy-plugin-images-responsiver). It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg)`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

## Documentation

- [Installation](https://nhoizey.github.io/images-responsiver/installation.html)
- Tutorial
  - [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
  - [Step 2: Better behavior with `images-responsiver` and default configuration](https://nhoizey.github.io/images-responsiver/tutorial-02-images-responsiver-default.html)
  - [Step 3: Enhanced behavior with some configuration](https://nhoizey.github.io/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)
  - [Step 4: Making it more robust with image dimensions](https://nhoizey.github.io/images-responsiver/tutorial-04-images-dimensions.html)
  - [Step 5: Dealing with images filenames and URLs](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html)
  - [Step 6: Even better responsive images](https://nhoizey.github.io/images-responsiver/tutorial-06-even-better-responsive-images.html)
- [Examples](https://nhoizey.github.io/images-responsiver/examples.html)
- [Debugging](https://nhoizey.github.io/images-responsiver/debugging.html)

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
