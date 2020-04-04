| **[<< Back home](/images-responsiver/#documentation)** | **[< Examples](/images-responsiver/examples.html)** |

# Tutorial step 4: Making it more robust with image dimensions

---

- [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
- [Step 2: Better behavior with `images-responsiver` and default configuration](https://nhoizey.github.io/images-responsiver/tutorial-02-images-responsiver-default.html)
- [Step 3: Enhanced behavior with some configuration](https://nhoizey.github.io/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)
- **Step 4: Making it more robust with image dimensions**
- [Step 5: Dealing with images filenames and URLs](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html)
- [Step 6: Even better responsive images](https://nhoizey.github.io/images-responsiver/tutorial-06-even-better-responsive-images.html)

---

We might still have an issue: even if we set a maximum width lower than `1280px` (like `512px` for the logo), we should not be able to define a width that is larger than the actual width of the pristine image, the largest we have before any computing. If we do that, we lie to the browser, and it might render the image at the width we told him, instead of the actual one, resulting in bad rendered quality.

So we should be able to tell `images-responsiver` about the actual width of the pristine image.

Why invent a new parameter? We already have the `width` attribute in HTML, let's use it, `images-responsiver` can read it.

_Note: it's anyway always a good idea to have the `width` and `height` attributes defined in images, as [it will enhance the page rendering performance](https://www.youtube.com/watch?v=4-d_SoCHeWE)._

Actually, if you run `images-responsiver` in debug mode (learn [more about debugging here](/images-responsiver/debugging.html)), you'll get warnings about missing `width` attributes. Instead of just `node run.js`, run `DEBUG=* node run.js`, and you'll get this in the console:

```bash
images-responsiver:info Transforming my-logo.png +0ms
images-responsiver:warning The image should have a width attribute: my-logo.png +0ms
images-responsiver:info Transforming colorful-netherlands.jpg +2ms
images-responsiver:warning The image should have a width attribute: colorful-netherlands.jpg +1ms
```

If the pristine image for the logo is `400px` wide, and the other pristine image is `1600px` wide, here's our new source HTML:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/04-images-dimensions/page.html?footer=minimal"></script>

If we run the exact same Node.js script on it:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/04-images-dimensions/run.js?footer=minimal"></script>

The result is further improved:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/04-images-dimensions/page-enhanced.html?footer=minimal"></script>

We should also update the CSS so that we don't try to render the image larger than it is. `width` can be replaced with `max-width`:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/04-images-dimensions/styles.css?footer=minimal"></script>

Ok, but where and when are my-logo-58.png, my-logo-285.png, etc. generated?

Let's see…

| **[Tutorial step 5 >](/images-responsiver/tutorial-05-images-urls.html)** | **[Back home >>](/images-responsiver/#documentation)** |
