[< Back home](/eleventy-plugin-images-responsiver/)

# Actual usage on nicolas-hoizey.com

For my own site <https://nicolas-hoizey.com/>, each article has it’s own folder, with the Markdown file and image(s).

For example:
https://github.com/nhoizey/nicolas-hoizey.com/tree/master/src/articles/2020/01/10/can-we-monitor-user-happiness-on-the-web-with-performance-tools

I use the same folder hierarchy in the source as in the site, so **I don’t have any permalink to compute** (small performance gain?) for HTML files.

I added image extensions to `templateFormats` so that Eleventy copy them for me in the same hierarchy:
https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/.eleventy.js#L290

Where I call the plugin:
https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/.eleventy.js#L261-L263

I use these options:
https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/src/_data/images-responsiver-config.js#L6-L42

The `runBefore` hook finds images in the page HTML, computes the image dimensions to add the `width`/`height` attributes (good for performance) and the full URL.

The plugin then transforms the URL as I told it, with resizing parameters:
https://github.com/nhoizey/nicolas-hoizey.com/blob/a25262c221ff8f19e129352fd67df89092514a1d/src/_data/images-responsiver-config.js#L6-L42

Here, I’m using Cloudinary ([sign-up for free](https://nho.io/cloudinary-signup), at least to try) to resize (and optimize) images, so I don’t have to compute any image on my local build.
