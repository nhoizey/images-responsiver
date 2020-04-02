# Step 1: Default behaviour without the plugin

## Run it

In the folder of the example, run a clean install then build in developer mode:

```bash
npm ci
npm start
```

Sources are in `src/` and build result is in `dist/`.

## Check the result

If you open `http://localhost:8080/` in a browser, both images should be visible.

Here is a screenshot on desktop:

![screenshot on desktop](screenshot-desktop.png)

And here on simulated mobile:

![screenshot on desktop](screenshot-mobile.png)

We might open it in different browsers, on different devices, with different viewport widths and screen densities, **the very same (potentially heavy) image files are downloaded**. Not cool for people on small devices with low resolution, and potentially bad connexions.

Let's try to enhance it with the plugin in [step 2](../02-with-plugin-default/#readme).
