# Images Responsiver

[![Build Status](https://travis-ci.org/nhoizey/images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

**Images Responsiver is a simple solution for most responsive images needs**.

Responsive images are **difficult to implement**, but **required to provide a good performance to Web users**.

## A Node.js library to ease responsive images

Images Responsiver transforms plain, simple `<img src="…">` HTML tags into better responsive images syntax with `srcset` and `sizes` attributes.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **Images Responsiver should be enough for most use cases**, where the need is known as Resolution Switching.

Read [this article on Cloudfour's blog to know more of the theory](https://cloudfour.com/thinks/responsive-images-the-simple-way/).

## A plugin for Eleventy

**Images Responsiver** is also available as a plugin for [Eleventy](https://www.11ty.dev/), a great Static Site Generator. It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg)`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

## One repository, multiple projects

Multiple projects are managed inside this shared monorepo.

| **Package**                                                                                                                                  | **Description**                                                    | **Docs**                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [`images-responsiver`](https://github.com/nhoizey/images-responsiver/tree/main/packages/images-responsiver)                                  | The core package                                                   | [docs](https://nhoizey.github.io/images-responsiver/images-responsiver/)                 |
| [`eleventy-plugin-images-responsiver`](https://github.com/nhoizey/images-responsiver/tree/main/packages/eleventy-plugin-images-responsiver/) | A plugin for [Eleventy](https://11ty.dev), a Static Site Generator | [docs](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/) |

## Documentation

Read the full documentation here: https://nhoizey.github.io/images-responsiver/

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

## Contributing

This monorepo is managed by [Lerna](https://lerna.js.org/).

## License

This project is licensed under the [MIT License](LICENSE.md).
