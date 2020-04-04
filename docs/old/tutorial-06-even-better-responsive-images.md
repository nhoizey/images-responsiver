| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 5](/images-responsiver/tutorial-05-images-urls.html)** |

# Tutorial step 6: Even better responsive images

---

- [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
- [Step 2: Better behavior with `images-responsiver` and default configuration](https://nhoizey.github.io/images-responsiver/tutorial-02-images-responsiver-default.html)
- [Step 3: Enhanced behavior with some configuration](https://nhoizey.github.io/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)
- [Step 4: Making it more robust with image dimensions](https://nhoizey.github.io/images-responsiver/tutorial-04-images-dimensions.html)
- [Step 5: Dealing with images filenames and URLs](https://nhoizey.github.io/images-responsiver/tutorial-05-images-urls.html)
- **Step 6: Even better responsive images**

---

## Adding classes

When we added the `data-responsiver` attribute to the source image, we added some complexity because there was already a class, which could feel redundant:

```html
<img src="my-logo.png" alt="My logo" class="logo" data-responsiver="logo" />
```

You can use an additional parameter to simplify this:

```javascript
const options = {
  …
  logo: {
    …
    classes: ['logo'],
  },
};
```

With this configuration, the class(es) will be added by `images-responsiver`, so your source HTML doesn't need it anymore:

```html
<img src="my-logo.png" alt="My logo" data-responsiver="logo" />
```

## Adding attributes

You might also want to add the same attribute to every image, or at least every image using one specific preset.

You can do that with the additional `attributes` parameter.

For example, if you want to benefit from recent [native lazy-loading in modern browsers](https://web.dev/native-lazy-loading/), you can further enhance your configuration with this:

```javascript
const options = {
  default: {
    attributes: {
      loading: 'lazy',
    },
  }
  …
  logo: {
    …
    classes: ['logo'],
  },
};
```

## Running hooks before and after transformation

_To be continued…_

## Targeting images to transform

<!-- `selector` -->

| **[Examples >](/images-responsiver/examples.html)** | **[Back home >>](/images-responsiver/#documentation)** |
