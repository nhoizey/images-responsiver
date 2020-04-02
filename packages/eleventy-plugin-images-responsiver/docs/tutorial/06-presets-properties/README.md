| **[<< back to home](../../)** | **[< back to step 5](../05-presets/#readme)** |

# Step 6: Presets properties

## Run it

In the folder of the tutorial step, run a clean install then build in developer mode:

```bash
npm ci
npm start
```

Sources are in `src/` and build result is in `dist/`.

## Check the result

If you open `http://localhost:8080/` in a browser, nothing changed visualy and the page weight is the same.

However, if you check the source Markdown, it is (a little) simpler:

<script src="https://gist-it.appspot.com/github/nhoizey/eleventy-plugin-images-responsiver/raw/master/docs/tutorial/06-presets-properties/src/index.md?footer=minimal"></script>

See how the logo class disapeared? There is no `{.logo}` anymore for the logo image.

## How does it work?

We had these presets:

```javascript
const presets = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
  },
  logo: {
    sizes: '(max-width: 45em) 18vw, 8em',
  },
};
```

### Adding classes

We can use presets to add classes to images.

For example, we can ad a `logo` class to every image using the `logo` preset with this syntax:

```javascript
const presets = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
  },
  logo: {
    sizes: '(max-width: 45em) 18vw, 8em',
    classes: ['logo'],
  },
};
```

We could also add multiple classes, as in [Tailwind's image floated right](https://tailwindcss.com/docs/float/#float-right):

```javascript
const presets = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
  },
  logo: {
    sizes: '(max-width: 45em) 18vw, 8em',
    classes: ['float-right', 'ml-4', 'my-2', 'h-32'],
  },
};
```

Please, don't do this for production code, [extract components](https://tailwindcss.com/docs/extracting-components)… 🙏

### Adding other attributes

We can also add other attributes to the images with the additional `attributes` property in each preset.

For example, we can benefit from recent [native lazy-loading in modern browsers](https://web.dev/native-lazy-loading/) with this:

```javascript
const presets = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
    attributes: {
      loading: 'lazy',
    },
  },
  logo: {
    sizes: '(max-width: 45em) 18vw, 8em',
    classes: ['logo'],
  },
};
```

If logo pristine images always have the same dimensions, we could even add them to the `logo` preset attributes:

```javascript
const presets = {
  default: {
    sizes: '(max-width: 45em) 90vw, 40em',
    attributes: {
      loading: 'lazy',
    },
  },
  logo: {
    sizes: '(max-width: 45em) 18vw, 8em',
    classes: ['logo'],
    attributes: {
      width: '400',
      height: '400',
    },
  },
};
```

With this configuration, we can really reduce the authors work complexity:

<script src="https://gist-it.appspot.com/github/nhoizey/eleventy-plugin-images-responsiver/raw/master/docs/tutorial/06-presets-properties/src/index.md?footer=minimal"></script>

_Note: If you use a [DAM](https://en.wikipedia.org/wiki/Digital_asset_management) to manage high definition source images, you could make sure the site's pristine images have always the same dimensions, `1600x1000` for example, and add them to the preset._

# Now… what?

_To be continued…_
