# Installation

To install and use `eleventy-plugin-images-responsiver` with Eleventy:

From your command line, install `eleventy-plugin-images-responsiver` as a dev dependency:

```
npm install eleventy-plugin-images-responsiver --save-dev
```

If you use `markdown-it` for Markdown computing (the default in Eleventy), you should add [the great `markdown-it-attrs` plugin](https://github.com/arve0/markdown-it-attrs) to be able to add ids, classes and attributes to your Markdown images and other block types. See [how to add a markdown-it plugin in Eleventy](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins)).

For example, `![My logo](my-logo.png){.logo}` will be transformed to `<img src="my-logo" alt="My logo" class="logo" />` in the HTML.

