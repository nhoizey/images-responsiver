| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 2](/images-responsiver/tutorial-02-images-responsiver-default.html)** |

# Tutorial

## Step 3: Enhanced behavior with some configuration

We need different `sizes` attribute values for different image use cases, but we don't want to repeat them for each images, and we want to provide content authors (even if that's us) with something as simple as possible so that they can focus on content.

Let's define **presets**, and configuration options attached to them.

First, we define a `default` preset that will be used for all images where the author doesn't set anything special.

```javascript
const options = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
  },
};
```

We set the default `sizes` attribute value, considering we will never have any image larger than the content. It overrides `images-responsiver`'s default value of `100vw`.

We now need to add a specific preset for the logo, which has different needs:

```javascript
const options = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
  },
  logo: {
    minWidth: 58,
    maxWidth: 512,
    steps: 3,
    fallbackWidth: 128,
    sizes: '(max-width: 45em) 18vw, 8em',
  },
};
```

The logo takes one fifth of the content width, so on small `320px` viewports with normal screen density it needs `320px * 90% * 1/5 = 58px` (rounded), and on largest viewports on Retina screens, it needs `512px` as we computed earlier.

We also tell `images-responsiver` with `steps` that 3 different image widths should be enough, instead of the default 5.

Finally, `fallbackWidth` is the width of the image we put in the `src` attribute for compatibility with really old browsers. Most of these browsers are desktop ones, so don't a value too small.

We also need a way for content authors to specify what preset an image should use, if the default one is not enough. We will use a `data-responsiver` data attribute, with the name of the preset as the value.

So for example, we change the HTML for the logo from:

```html
<img src="my-logo.png" alt="My logo" class="logo" />
```

To:

```html
<img src="my-logo.png" alt="My logo" class="logo" data-responsiver="logo" />
```

We can now run this updated Node.js script:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/examples/02_simple/run.js"></script>

Here's the new enhanced HTML that we get:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/examples/02_simple/page-enhanced.html"></script>

This is really much better, the browser will download images with much smaller dimensions (and weight), yet large enough for a great rendering.

| **[Tutorial step 4 >](/images-responsiver/tutorial-04-images-dimensions.html)** | **[Back home >>](/images-responsiver/#documentation)** |
