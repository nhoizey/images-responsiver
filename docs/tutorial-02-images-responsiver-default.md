| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 1](/images-responsiver/tutorial-01-without-images-responsiver.html)** |

# Tutorial step 2: Better behavior with images-responsiver and default configuration

----

- [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
- **Step 2: Better behavior with `images-responsiver` and default configuration**
- [Step 3: Enhanced behavior with some configuration](https://nhoizey.github.io/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)
- [Step 4: Making it more robust with image dimensions](https://nhoizey.github.io/images-responsiver/tutorial-04-images-dimensions.html)
- [Step 5: Dealing with images filenames and URLs](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html)
- [Step 6: Even better responsive images](https://nhoizey.github.io/images-responsiver/tutorial-06-even-better-responsive-images.html)

----

You can use this Node.js script:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/02-images-responsiver-default/run.js?footer=minimal"></script>

Run it from the command line:

```bash
node run.js
```

You'll get the enhanced page in this new HTML file:

<script src="https://gist-it.appspot.com/github/nhoizey/images-responsiver/raw/master/docs/examples/02-images-responsiver-default/page-enhanced.html?footer=minimal"></script>

_Note: a `pristine` value is added to the image's dataset with the original URL, in case you want to do anything else with it later (provide a "zoom" link for example)._

The situation is better, because users with small viewports (and reasonable screen densities) will download smaller images.

*Note: `images-responsiver` don't do anything to:*
- *SVG images*
- *bitmap images that don't have any `src` attribute*
- *bitmap images that already have a `srcset` attribute*

But there are a few issues:

- The `sizes` attributes with a `100vw` value tells the browser that the image will be rendered on the full width of the viewport, but that's not what we want:
  - We know the second image (`colorful-netherlands.jpg`) should occupy only the width of the content, which per CSS rules is `90vw` with a maximum of `40em`. This `40em` width for the content is reached when the viewport reaches `40 / 0.9 = 45em` (rounded). So we should be able to set a `sizes` attribute with the value `(max-width: 45em) 90vw, 40em` (or `(min-width: 45em) 40em, 90vw` but the result is the same).
  - For the logo (the first image), we need one fifth of the content width, so the `sizes` attribute value is simple math from the previous one: `(max-width: 45em) 18vw, 8em`.
- If the maximum width for the logo is `8em` on largest viewports, and most users have a browser with a default root font size of `16px`, these `8em` are computed to `128px`. Let's consider the user is on a high density display ("Retina" in Apple language), so double it, and that [the user might need to increase the font size for readability](https://nicolas-hoizey.com/articles/2018/06/15/users-do-change-font-size/), so double it a second time. We then need an image with a maximum useful width of `512px`. We see the HTML tells the browser that the maximum width for the image is `2560px` (the `w` descriptor is the "`w`idth in pixels"). Far beyond what we need! We should be able to set a maximum (and sometimes a minimum) for the sequence of image widths in the `srcset` attribute.

These issues exist because there is no default configuration that would be correct for all use cases.

Let's tell the `images-responsiver` what to do with the images…

| **[Tutorial step 3 >](/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)** | **[Back home >>](/images-responsiver/#documentation)** |
