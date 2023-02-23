# Images Responsiver

[![Build Status](https://github.com/nhoizey/images-responsiver/workflows/Tests%20CI/badge.svg)](https://github.com/nhoizey/images-responsiver/actions)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)
[![license](https://img.shields.io/github/license/nhoizey/images-responsiver)](https://github.com/nhoizey/images-responsiver/blob/main/LICENSE.md)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/images-responsiver)
[![Pull requests welcome](https://img.shields.io/badge/PRs-welcome-blueviolet)](https://github.com/nhoizey/images-responsiver/blob/main/CONTRIBUTING.md)

**Images Responsiver is a simple solution for most responsive images needs**.

Responsive images are difficult to implement, but they're **required to provide a good performance to Web users**.

Images Responsiver transforms simple `<img src="…">` HTML tags into better responsive images syntax with `srcset` and `sizes` attributes. Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **Images Responsiver should be enough for most use cases**, known as Resolution Switching. Read [this article on Cloudfour's blog to know more of the theory](https://cloudfour.com/thinks/responsive-images-the-simple-way/).

Images Responsiver is also available as a plugin for [Eleventy](https://11ty.dev/), a great Static Site Generator: [eleventy-plugin-images-responsiver](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/). It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg)`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

## Documentation

Images Responsiver documentation is awaiting a full rewrite.

In the mean time, most of the documentation for [eleventy-plugin-images-responsiver](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/), the Eleventy plugin that uses it, should be enough to understand how it works.

"Just" replace any Markdown with the HTML it is transformed into, and use the same configuration to get the same result.

## Contributing

First, thank you for considering contributing to `images-responsiver`! It's people like you that make the open source community such a great community! 😊

There are many ways to contribute to this project. [Get started here](https://github.com/nhoizey/images-responsiver/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE.md).

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.
