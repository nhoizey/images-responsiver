# images-responsiver

[![Build Status](https://travis-ci.org/nhoizey/images-responsiver.svg?branch=master)](https://travis-ci.org/nhoizey/images-responsiver)
[![GitHub stars](https://img.shields.io/github/stars/nhoizey/images-responsiver.svg?style=social)](https://github.com/nhoizey/images-responsiver/stargazers)

**`images-responsiver` is a simple solution for most responsive images needs**.

Responsive Images are difficult to implement, but they're required to provide a good performance to Web users.

`images-responsiver` transforms simple `<img src="…">` HTML tags into better responsive images syntax with `srcset` and `sizes` attributes.

Knowing that [`<picture>` is only required for rare advanced usages](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/), **`images-responsiver` should be enough for most use cases**.

`images-responsiver` is also available as a plugin for [Eleventy](https://www.11ty.dev/), a great Static Site Generator: [eleventy-plugin-images-responsiver](https://github.com/nhoizey/eleventy-plugin-images-responsiver)

## Usage

To install and use `images-responsiver`, you’ll need [npm](http://npmjs.com) (which comes with [Node.js](https://nodejs.org/en/download/)) installed on your computer.

From your command line, install `images-responsiver` as a dev dependency (as you'll probably use it on the server only, in a build script):

```
npm install images-responsiver --save-dev
```

Then import it in your Node.js script:

```
const imagesResponsiver = require('images-responsiver');
```

Then use it, like in the [simple example](./examples/01_simple/):

### The input

Let's say you have this `page.html` HTML file:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive images made easy</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="container">
    <img src="my-logo.png" data-responsiver="logo" />
    <p>Here is a simple image:</p>
    <p><img src="my-photo.jpg" /></p>
  </div>
</body>

</html>
```

And this `style.css` CSS:

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

The logo should be floating on the right, using one fifth of the available space, and the other image should take the full with of the container.

### The script

Here's how you would get responsive images in the HTML with a Node.js script:

```javascript
const fs = require('fs');
const imagesResponsiver = require('images-responsiver');

const srcHtml = fs.readFileSync('page.html', { encoding: 'utf8' });
const options = {
  selector: 'img',
  resizedImageUrl: (src, width) => `${src}?w=${width}`,
  presets: {
    default: {
      fallbackWidth: 640,
      minWidth: 320,
      maxWidth: 1280,
      sizes: '(max-width: 44em) 90vw, 40em',
      attributes: {
        loading: 'lazy'
      }
    },
    logo: {
      fallbackWidth: 128,
      minWidth: 58,
      maxWidth: 256,
      steps: 3,
      sizes: '(max-width: 44em) 18vw, 8em',
      classes: ['logo']
    }
  }
};
const distHtml = imagesResponsiver(srcHtml, options);
fs.writeFileSync('page-responsive.html', distHtml);
```

### The result

Here's the resulting `page-responsive.html` HTML page:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive images made easy</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div class="container">
    <img src="my-logo.png?w=128" class="logo"
      srcset="my-logo.png?w=58 58w, my-logo.png?w=157 157w, my-logo.png?w=256 256w" sizes="(max-width: 44em) 18vw, 8em"
      data-pristine="my-logo.png" loading="lazy">
    <p>Here is a simple image:</p>
    <p><img src="my-photo.jpg?w=640"
        srcset="my-photo.jpg?w=320 320w, my-photo.jpg?w=560 560w, my-photo.jpg?w=800 800w, my-photo.jpg?w=1040 1040w, my-photo.jpg?w=1280 1280w"
        sizes="(max-width: 44em) 90vw, 40em" data-pristine="my-photo.jpg" loading="lazy"></p>
  </div>
</body>

</html>
```

#### The floating logo

This image:

```html
<img
  src="my-logo.png"
  data-responsiver="logo" />
```

…has been transformed like this (formated to ease reading):

```html
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
```

The `loading` attribute comes from the `default` preset, and the `sizes` attribute as well as settings for the `srcset` attributes come from the `logo` preset, which surcharges the `default` one. The `logo` class comes from the `logo` preset.

#### The full width photography

This other image:

```html
<img src="my-photo.jpg" />
```

…has been transformed like this (again, formated to ease reading):

```html
<img
  src="my-photo.jpg?w=640"
  srcset="
    my-photo.jpg?w=320 320w,
    my-photo.jpg?w=560 560w,
    my-photo.jpg?w=800 800w,
    my-photo.jpg?w=1040 1040w,
    my-photo.jpg?w=1280 1280w"
  sizes="(max-width: 44em) 90vw, 40em"
  data-pristine="my-photo.jpg"
  loading="lazy" />
```

There was no `data-responsiver` attribute, so the `default` preset is used.

## Detailed usage

- A `pristine` value is added to the image's dataset with the original URL, in case you want to do anything else with it later, provide a zoom link for example.
- Each image can use multiple presets in the `data-responsiver` attribute, each value separated by a space like for classes.
- Settings from each preset surcharges the previous one(s), in the order they're declared.
- If a `width` attribute is defined in the image, its value will be used as the maximum fallback or srcset width, if it is smaller than the values from the preset. Additionnaly, if `width` and `height` attributes are both defined in the image, [the page rendering will be faster](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be).

## Additional informations

- `images-responsiver` don't do anything to SVG images.

## Authors

- [Nicolas Hoizey](https://github.com/nhoizey): Idea and initial work, maintainer

See also the list of [contributors](https://github.com/nhoizey/images-responsiver/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
