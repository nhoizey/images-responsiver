| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 2](/images-responsiver/tutorial-02-images-responsiver-default.html)** |

# Tutorial step 3: Enhanced behavior with some configuration

---

- [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
- [Step 2: Better behavior with `images-responsiver` and default configuration](https://nhoizey.github.io/images-responsiver/tutorial-02-images-responsiver-default.html)
- **Step 3: Enhanced behavior with some configuration**
- [Step 4: Making it more robust with image dimensions](https://nhoizey.github.io/images-responsiver/tutorial-04-images-dimensions.html)
- [Step 5: Dealing with images filenames and URLs](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html)
- [Step 6: Even better responsive images](https://nhoizey.github.io/images-responsiver/tutorial-06-even-better-responsive-images.html)

---

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

The logo takes one fifth of the content width, so on small `320px` viewports with normal screen density it needs `320px * 90% * 1/5 = 58px` (rounded), and on largest viewports on Retina screens (with font-size doubled), it needs `512px` as we computed earlier.

We also tell `images-responsiver` with `steps` that 3 different image widths should be enough, instead of the default 5.

Finally, `fallbackWidth` is the width of the image we put in the `src` attribute for compatibility with really old browsers. Most of these browsers are desktop ones, so don't use a value too small.

We also need a way for content authors to specify what preset an image should use, if the default one is not enough. We will use a `data-responsiver` data attribute, with the name of the preset as the value.

So for example, we change the HTML for the logo from:

```html
<img src="my-logo.png" alt="My logo" class="logo" />
```

To:

```html
<img src="my-logo.png" alt="My logo" class="logo" data-responsiver="logo" />
```

_Note: Each image can use multiple presets in the `data-responsiver` attribute, each value separated by a space (like classes). Settings from each preset surcharges the previous one(s), in the order they're declared._

We can now run this updated Node.js script:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/main/docs/examples/03-images-responsiver-simple-configuration/run.js?footer=minimal"></script>

Here's the new enhanced HTML that we get:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/main/docs/examples/03-images-responsiver-simple-configuration/page-enhanced.html?footer=minimal"></script>

This is really much better, the browser will download images with much smaller dimensions (and weight), yet large enough for a great rendering.

| **[Tutorial step 4 >](/images-responsiver/tutorial-04-images-dimensions.html)** | **[Back home >>](/images-responsiver/#documentation)** |
