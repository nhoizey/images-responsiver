# Images Responsiver

[![Build Status](https://travis-ci.org/nhoizey/images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

**Images Responsiver is a simple solution for most responsive images needs**.

Responsive images are **difficult to implement**, but **required to provide a good performance to Web users**.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [A Node.js library to ease responsive images](#a-nodejs-library-to-ease-responsive-images)
- [A plugin for Eleventy](#a-plugin-for-eleventy)
- [Documentation](#documentation)
- [One repository, multiple projects](#one-repository-multiple-projects)
- [Authors](#authors)
- [Contributing](#contributing)
- [Tools and automations](#tools-and-automations)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## A Node.js library to ease responsive images

Images Responsiver transforms plain, simple `<img src="…">` HTML tags into better responsive images syntax with `srcset` and `sizes` attributes.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **Images Responsiver should be enough for most use cases**, where the need is known as Resolution Switching.

Read [this article on Cloudfour's blog to know more of the theory](https://cloudfour.com/thinks/responsive-images-the-simple-way/).

## A plugin for Eleventy

**Images Responsiver** is also available as a plugin for [Eleventy](https://www.11ty.dev/), a great Static Site Generator. It allows authors to use the simple and standard Markdown syntax for images — `![alt text](image.jpg)` — and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

## Documentation

Read the full documentation here: https://nhoizey.github.io/images-responsiver/

## One repository, multiple projects

Multiple projects are managed inside this shared monorepo.

| **Package**                                                                                                                                  | **Description**                                                    | **Docs**                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [`images-responsiver`](https://github.com/nhoizey/images-responsiver/tree/main/packages/images-responsiver)                                  | The core package                                                   | [docs](https://nhoizey.github.io/images-responsiver/images-responsiver/)                 |
| [`eleventy-plugin-images-responsiver`](https://github.com/nhoizey/images-responsiver/tree/main/packages/eleventy-plugin-images-responsiver/) | A plugin for [Eleventy](https://11ty.dev), a Static Site Generator | [docs](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/) |

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

## Contributing

Thanks for your interest in contributing!

There are many ways to contribute to this project. [Get started here](https://github.com/nhoizey/images-responsiver/blob/master/CONTRIBUTING.md).

## Tools and automations

- This monorepo is managed with [Lerna](https://lerna.js.org/).
- Tests are run by [jest](https://jestjs.io/) and written in [the `__tests__` folder](https://github.com/nhoizey/images-responsiver/tree/main/packages/images-responsiver/__tests__) for each package.
- Pull Requests are checked with tests run on [Travis CI](https://travis-ci.org/nhoizey/images-responsiver) (see [configuration](https://github.com/nhoizey/images-responsiver/blob/main/.travis.yml))
- Dependencies updates are automated with [dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/) (see [configuration](https://github.com/nhoizey/images-responsiver/blob/main/.github/dependabot.yml))
- Pull Requests are rebased as necessary, and merged automaticaly by [Kodiak](https://kodiakhq.com/) if there is an 'automerge 🤞' label (set by `dependabot` for example) and Travis CI check is OK (see [configuration](https://github.com/nhoizey/images-responsiver/blob/main/.kodiak.toml))
- The documentation is written as Markdown files in [the `docs/` folder](https://github.com/nhoizey/images-responsiver/tree/main/docs), and tsransformed into HTML by [Jekyll](https://jekyllrb.com/) powered [GitHub Pages](https://pages.github.com/): https://nhoizey.github.io/images-responsiver/

## License

This project is licensed under the [MIT License](LICENSE.md).
