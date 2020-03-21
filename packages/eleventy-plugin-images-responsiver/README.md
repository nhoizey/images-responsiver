# eleventy-plugin-images-responsiver

[![Build Status](https://travis-ci.org/nhoizey/eleventy-plugin-images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/eleventy-plugin-images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/eleventy-plugin-images-responsiver.svg?style=social)](https://github.com/nhoizey/eleventy-plugin-images-responsiver/stargazers)

**`eleventy-plugin-images-responsiver` is a simple solution for most responsive images needs with [Eleventy](https://www.11ty.dev/)**.

It allows authors to use the simple and standard Markdown syntax for images (`![alt text](image.jpg "caption text")`) and yet get responsive images in the generated HTML, with `srcset` and `sizes` attributes.

Responsive Images are difficult to implement, but they're **required to provide a good performance to Web users**.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`eleventy-plugin-images-responsiver` should be enough for most use cases**.

`eleventy-plugin-images-responsiver` is "just" a thin layer between Eleventy plugin and transformations system and [images-responsiver](https://github.com/nhoizey/images-responsiver), a generic HTML transformation Node.js module for simple responsive images.

## Usage

### Installation

To install and use `eleventy-plugin-images-responsiver` with Eleventy:

From your command line, install `eleventy-plugin-images-responsiver` as a dev dependency:

```
npm install eleventy-plugin-images-responsiver --save-dev
```

If you use `markdown-it` for Markdown computing (the default in Eleventy), you should add [the great `markdown-it-attrs` plugin](https://github.com/arve0/markdown-it-attrs) to be able to add ids, classes and attributes to your Markdown images and other block types. See [how to add a markdown-it plugin in Eleventy](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins)).

For example, `![My logo](my-logo.png){.logo}` will be transformed to `<img src="my-logo" alt="My logo" class="logo" />` in the HTML.

### The input

Let's say you have this Markdown file (could be [another template format](https://www.11ty.dev/docs/languages/), even plain HTML if you want, Eleventy won't judge you): `my-illustrated-post.md`

```markdown
---
title: My illustrated post
layout: post.njk
---

![My logo](my-logo.png){data-responsiver=logo}
Here is a simple image:

![A photo of my office](my-office.jpg "This is my beautiful office")
```

And this Eleventy layout (using Nunjucks, but it doesn't matter) to build an HTML page: `post.njk`

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

And this CSS file: `styles.css`

```css
.container {
  width: 90vw;
  max-width: 40em;
}

.logo {
  width: 20%;
  float: right;
  margin: 0 0 1em 1em;
}
```

Without `eleventy-plugin-images-responsiver`, the HTML for the page would be:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My illustrated post</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="container">
    <h1>My illustrated post</h1>
    <img src="my-logo.png" alt="My logo" data-responsiver="logo" />
    <p>Here is a simple image:</p>
    <p><img src="my-office.jpg" alt="A photo of my office" title="This is my beautiful office" /></p>
  </div>
</body>

</html>
```

With `eleventy-plugin-images-responsiver` and some configuration, it could be much better:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My illustrated post</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div class="container">
    <h1>My illustrated post</h1>
    <img
      src="my-logo.png?w=128"
      class="logo"
      srcset="
        my-logo.png?w=58 58w,
        my-logo.png?w=157 157w,
        my-logo.png?w=256 256w"
      sizes="(max-width: 44em) 18vw, 8em"
      data-pristine="my-logo.png"
      loading="lazy" />
    <p>Here is a simple image:</p>
    <p>
      <img
        src="my-office.jpg?w=640"
        srcset="
          my-office.jpg?w=320 320w, 
          my-office.jpg?w=560 560w,
          my-office.jpg?w=800 800w,
          my-office.jpg?w=1040 1040w,
          my-office.jpg?w=1280 1280w"
        sizes="(max-width: 44em) 90vw, 40em"
        data-pristine="my-office.jpg"
        loading="lazy" />
      </p>
  </div>
</body>

</html>
```

The logo would be floating on the right, using one fifth of the available space, and the other image would take the full with of the container.

*To be continued…*

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/eleventy-plugin-images-responsiver/contributors) who participated in this project.

## License

This project is licensed under the [MIT License](LICENSE.md).
