| **[<< Back home](/images-responsiver/#documentation)** | **[< Tutorial step 4](/images-responsiver/tutorial-04-images-dimensions.html)** |

# Tutorial step 5: Dealing with images filenames and URLs

----

- [Step 1: Default behavior without `images-responsiver`](https://nhoizey.github.io/images-responsiver/tutorial-01-without-images-responsiver.html)
- [Step 2: Better behavior with `images-responsiver` and default configuration](https://nhoizey.github.io/images-responsiver/tutorial-02-images-responsiver-default.html)
- [Step 3: Enhanced behavior with some configuration](https://nhoizey.github.io/images-responsiver/tutorial-03-images-responsiver-simple-configuration.html)
- [Step 4: Making it more robust with image dimensions](https://nhoizey.github.io/images-responsiver/tutorial-04-images-dimensions.html)
- **Step 5: Dealing with images filenames and URLs**
- [Step 6: Even better responsive images](https://nhoizey.github.io/images-responsiver/tutorial-06-even-better-responsive-images.html)

----

`images-responsiver` doesn't transform images files, it "only" transforms HTML. That's already a lot, as you should have noticed.

You have to define how these multiple width images are generated:

- you can transform them yourself with an asynchronous batch script, but that might be difficult if you don't know the widths there will be in the HTML
- you can parse the enhanced HTML to list the images you need, either outside `images-responsiver` or thanks to the `runAfter` parameter, which is a hook function that runs at the end of the transformation
- you can use dynamic image rendering, computing the required image on the server when it is requested by the browser
  - either with your self hosted solution, with [a simple PHP script](https://css-tricks.com/snippets/php/server-side-image-resizer/) for example, or [thumbor](http://thumbor.org/), an "open-source smart on-demand image cropping, resizing and filters" solution
  - or with an image CDN like Cloudinary, Imgix, Akamai Image Manager, etc.

Some of these solutions might require specific URL for the images to compute, they might not be compatible with image names like `my-logo-58.png`.

## Defining your own URL format

That's why you can use the `resizedImageUrl` function in `images-responsiver` options. This is the default function:

```javascript
const defaultResizedImageUrl = (src, width) =>
  src.replace(/^(.*)(\.[^\.]+)$/, '$1-' + width + '$2');
```

It transforms `(my-logo.png, 58)` into `my-logo-58.png`.

You can define your own simple function to replace the default one.

For example, if the width has to be a `w` query parameter:

```javascript
const options = {
  resizedImageUrl: (src, width) => `${src}?w=${width}`,
};
```

It will transform `(my-logo.png, 58)` into `my-logo.png?w=58`.

## Using an image CDN

Relying on a third party service might make some fear of losing control, but resizing and optimizing images as much and as good as such services is really hard, and it requires computing power and storage space. Here, it requires "just" an URL.

### Using Cloudinary

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

### Using other image CDNs

Feel free to submit a [Pull Request](https://github.com/nhoizey/images-responsiver/pulls) to enhance documentation with other Image CDN examples.

| **[Tutorial step 6 >](/images-responsiver/tutorial-06-even-better-responsive-images.html)** | **[Back home >>](/images-responsiver/#documentation)** |
