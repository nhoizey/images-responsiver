| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 5](/images-responsiver/tutorial-05-images-urls.html)** |

# Tutorial

## Step 6: Even better responsive images

_To be continued…_

### Adding classes

_To be continued…_

### Adding attributes

_To be continued…_

<!-- https://web.dev/native-lazy-loading/ -->

### Running hooks before and after transformation

_To be continued…_

### Targeting images to transform

`selector`

# Additional informations

- Each image can use multiple presets in the `data-responsiver` attribute, each value separated by a space like for classes.
- Settings from each preset surcharges the previous one(s), in the order they're declared.
- `images-responsiver` don't do anything to:
  - SVG images
  - bitmap images that don't have any `src` attribute
  - bitmap images that already have a `srcset` attribute

| **[Examples >](/images-responsiver/examples.html)** | **[Back home >>](/images-responsiver/#documentation)** |
