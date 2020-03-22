[< Back home](/eleventy-plugin-images-responsiver/)

# Usage: step by step tutorial

## Default behavior without the plugin

Let's say you have this Markdown file (could be [another template format](https://www.11ty.dev/docs/languages/), even plain HTML if you want, Eleventy won't judge you) with YAML Front Matter: `my-illustrated-post.md`

```markdown
---
title: My illustrated post
layout: post.njk
---

![My logo](my-logo.png){.logo}

Here is a simple image:

![A photo of my office](my-office.jpg "This is my beautiful office")
```

Notice that it uses the `markdown-it-attrs` plugin to be able to add a `logo` class to the image, as suggested in the [installation](./installation.html).

Add this Eleventy layout (using Nunjucks, but it doesn't really matter either) to build an HTML page: `post.njk`

<!-- {% raw %} -->
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
<!-- {% endraw %} -->

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

We want the content to occupy 90% of the available space (but no more than `40em`, better for readability of multi-lines text), and the logo to use 50% of this content width, floated on the right.

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
    <img src="my-logo.png" alt="My logo" class="logo" />
    <p>Here is a simple image:</p>
    <p><img src="my-office.jpg" alt="A photo of my office" title="This is my beautiful office" /></p>
  </div>
</body>

</html>
```

The page probably looks exactly how you want, thanks to the clean HTML structure and the CSS rules.

But each image is available in only one single dimension (large probably), even if people with many different devices/browsers, with different viewport widths, would rather download only what's necessary.

## Enhanced behavior with the plugin, but no specific configuration

Now add `eleventy-plugin-images-responsiver`, without any configuration, to enhance it.

The body of HTML from above is then transformed to this one:

```html
<body>
  <div class="container">
    <h1>My illustrated post</h1>
    <img
      src="my-logo-640.png"
      class="logo"
      srcset="
        my-logo-320.jpg 320w,
        my-logo-880.jpg 880w,
        my-logo-1440.jpg 1440w,
        my-logo-2000.jpg 2000w,
        my-logo-2560.jpg 2560w"
      sizes="100vw"
      data-pristine="my-logo.png" />
    <p>Here is a simple image:</p>
    <p>
      <img
        src="my-office-640.jpg"
        srcset="
          my-office-320.jpg 320w,
          my-office-880.jpg 880w,
          my-office-1440.jpg 1440w,
          my-office-2000.jpg 2000w,
          my-office-2560.jpg 2560w"
        sizes="100vw"
        data-pristine="my-office.jpg" />
      </p>
  </div>
</body>
```

The situation is already better, because users with small viewports (and reasonable screen densities) will download smaller images.

But there are a few issues:

- The `sizes` attributes with a `100vw` value tells the browser that the image will be rendered on the full width of the viewport, but that's not what we want:
 - We know the second image (`my-office.jpg`) should occupy only the width of the content, which per CSS rules is `90vw` with a maximum of `40em`. This `40em` width for the content is reached when the viewport reaches `40 / 0.9 = 45em` (rounded). So we should be able to set a `sizes` attribute with the value `(max-width: 45em) 90vw, 40em` (or `(min-width: 45em) 40em, 90vw` but the result is the same).
 - For the logo (the first image), we need one fifth of the content width, so the `sizes` attribute value is simple math from the previous one: `(max-width: 45em) 18vw, 8em`.
- If the maximum width for the logo is `8em`, on largest viewports, most users have a browser with a default root font size of `16px`, so these `8em` are computed to `128px`. Let's consider the user is on a high density display ("Retina" for Apple), so double it, and that [the user might need to increase the font size for readability](https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/), so double it a second time. We need then an image with a maximum useful width of `512px`. We see the HTML tells the browser that the maximum width for the image is `2560px` (the `w` descriptor is the "`w`idth in pixels"). Far beyond what we need! We should be able to set a maximum (and sometimes a minimum) for the sequence of image widths in the `srcset` attribute.

These issues exist because there is no default configuration that would be correct for all use cases. You have to tell the plugin what to do with the images:

## Enhanced behavior with some configuration

We need different `sizes` attribute values for different images, but we don't want to repeat them for each images, and give content authors (even if that's us) as little to do as possible so that they focus on content.

Let's define presets, and configuration options attached to them.

First, we define a `default` preset that will be used for all images where the author doesn't tell anything special.

```javascript
const options = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em'
  }
}
```

We set the default `sizes` attribute value, considering we will never have any image larger than the content. It overrides the plugin's default value of `100vw`.

We now need to add a specific preset for the logo, which has different needs:

```javascript
const options = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em'
  },
  logo: {
    minWidth: 58,
    maxWidth: 512,
    steps: 3,
    fallbackWidth: 128,
    sizes: '(max-width: 45em) 18vw, 8em'
  }
}
```

The logo takes one fifth of the content width, so on small `320px` viewports with normal screen density it needs `320px * 90% * 1/5 = 58px` (rounded), and on largest viewports on Retina screens, it needs `512px` as we showed earlier. We also tel the plugin that 3 different image widths should be enough, instead of the default 5. Finally, `fallbackWidth` is the width of the image we put in the `src` attribute for compatibility with really old browsers.

We also need to let content authors specify that an image should use one of the presets, if the default one is not good. We use a data attribute named `data-responsiver`, with the name of the preset as the value.

So for example, we change the Markdown for the logo from:

```markdown
![My logo](my-logo.png){.logo}
```

To:

```markdown
![My logo](my-logo.png){.logo}{data-responsiver=logo}
```

With this configuration and updated content, the result is much better:

```html
<body>
  <div class="container">
    <h1>My illustrated post</h1>
    <img
      src="my-logo-128.png"
      class="logo"
      srcset="
        my-logo-58.png 58w,
        my-logo-285.png 285w,
        my-logo-512.png 512w"
      sizes="(max-width: 45em) 18vw, 8em"
      data-pristine="my-logo.png" />
    <p>Here is a simple image:</p>
    <p>
      <img
        src="my-office-640.jpg"
        srcset="
          my-office-320.jpg 320w,
          my-office-880.jpg 880w,
          my-office-1440.jpg 1440w,
          my-office-2000.jpg 2000w,
          my-office-2560.jpg 2560w"
        sizes="(max-width: 45em) 90vw, 40em"
        data-pristine="my-office.jpg" />
      </p>
  </div>
</body>

</html>
```

This is really much better, the browser will download images with much smaller dimensions (and weight), yet large enough for a great rendering.

## Making it more robust with image dimensions

But we might still have an issue:

Even if we set a maximum width lower than `2560px` (like `512px` for the logo), we should not be able to define a width that is larger than the actual width of the pristine image, the largest we have before any computing. If we do that, we lie to the browser, and it might render the image at the width we told him, instead of the actual one, resulting in bad rendered quality.

We should be able to tell the plugin about the actual width of the pristine image. Why invent a new parameter, we already have the `width` attribute in HTML, let's use it, the plugin can read it.

*NB: it's anyway always a good idea to have the `width` and `height` attributes defined in images, as [it will help the page rendering performance](https://www.youtube.com/watch?v=4-d_SoCHeWE).*

We can add this attribute multiple ways:

- We can add it manually in our Markdown with `{width=400}` for example:

  `![My logo](my-logo.png){.logo}{data-responsiver=logo}`
  
  becomes

  `![My logo](my-logo.png){.logo}{data-responsiver=logo}{width=400}`
  
  Pretty cumbersome for authors.
- We can use the [`markdown-it-imsize` plugin](https://github.com/tatsy/markdown-it-imsize) with the `autofill` option, so that image width and height are added automatically (I didn't try yet)
- Or we can use the `runBefore` hook in the plugin options to run a function that will add these width and height before any responsive transformation. That's [what I currently do for my site](./nicolashoizeycom.html).

If the pristine image for the logo is `400px` wide, and the other pristine image is `1600px` wide, the result is now even better:

```html
<body>
  <div class="container">
    <h1>My illustrated post</h1>
    <img
      src="my-logo-128.png"
      width="400"
      height="400"
      class="logo"
      srcset="
        my-logo-58.png 58w,
        my-logo-285.png 285w,
        my-logo-400.png 400w"
      sizes="(max-width: 45em) 18vw, 8em"
      data-pristine="my-logo.png" />
    <p>Here is a simple image:</p>
    <p>
      <img
        src="my-office-640.jpg"
        width="1600"
        height="1200"
        srcset="
          my-office-320.jpg 320w,
          my-office-880.jpg 880w,
          my-office-1440.jpg 1440w,
          my-office-2000.jpg 2000w,
          my-office-2560.jpg 2560w"
        sizes="(max-width: 45em) 90vw, 40em"
        data-pristine="my-office.jpg" />
      </p>
  </div>
</body>

</html>
```

We should also update the CSS so that we don't try to render the image larger than it is. `width` can be replaced with `max-width`:

```css
.logo {
  max-width: 20%;
  float: right;
  margin: 0 0 1em 1em;
}
```

# Ok, but where and when are my-logo-58.png, my-logo-285.png, etc. generated?

`eleventy-plugin-images-responsiver` doesn't transform images files, it "only" transforms HTML.

You have to define how these multiple width images are generated:

- you can transform them yourself with an asynchronous batch script, but that might be difficult if you don't know the widths there will be in the HTML
- you can use the `runAfter` hook to get the list of images to compute after the HTML is transformed
- you can use dynamic image rendering, computing the required image when it is requested by the browser

 - either with your self hosted solution, with [a simple PHP script](https://css-tricks.com/snippets/php/server-side-image-resizer/) for example, or [thumbor](http://thumbor.org/), an "open-source smart on-demand image cropping, resizing and filters" solution
 - or with an image CDN like Cloudinary, Imgix, Akamai Image Manager, etc.

These different solutions might require specific URL for the images to compute.

## Defining your own URL format

That's why you can use the `resizedImageUrl` function in the options of the plugin. This is the default function:

```javascript
const defaultResizedImageUrl = (src, width) =>
    src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2');
```

You can define your own simple function if the width has to be a `w` query parameter:

```javascript
const options = {
  resizedImageUrl: (src, width) => `${src}?w=${width}`,
  default: {
    sizes: '(max-width: 45em) 90vw, 40em'
  },
  logo: {
    minWidth: 58,
    maxWidth: 512,
    steps: 3,
    fallbackWidth: 128,
    sizes: '(max-width: 45em) 18vw, 8em'
  }
}
```

## Using an image CDN

For Cloudinary ([sign-up for free](https://nho.io/cloudinary-signup), it should be enough for most personal sites), like explained in [the exemple usage from nicolas-hoizey.com](./nicolashoizeycom.html), here is the `resizedImageUrl` function:

```javascript
(src, width) =>
  `https://res.cloudinary.com/nho/image/fetch/q_auto,f_auto,w_${width}/${src}`,
```

Here, `nho` is the cloud name, linked to my own Cloudinary account.

This URL will:

- resize the pristine image (`${src}`) to the desired width (`w_${width}`),
- chose the best compression level without sacrificing quality (`q_auto`),
- and chose the best encoding format depending of the browser capacity (`f_auto`), for example `WebP`, even if the pristine image is a `JPEG`.

Relying on a third party service might make some fear of losing control, but resizing and optimizing images as much and as good as such services is really hard, and it requires computing power and storage space. Here, it requires "just" an URL.

# We can further enhance the image

*To be continued…*

## Adding classes

## Adding attributes

## Running hooks before and after transformation

