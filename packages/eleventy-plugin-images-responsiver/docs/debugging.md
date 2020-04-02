# Debugging

You can run Eleventy build in debug mode to get informations and warnings about your Markdown, HTML or plugin options.

Add `DEBUG=*` in front of the command to get messages in the console, including a lot of debug message from Eleventy, not specific to this plugin.

Use `DEBUG=image-responsiver:*` to only get debug messages from the plugin:

```bash
images-responsiver:info Transforming my-logo.png +0ms
images-responsiver:warning The image should have a width attribute: my-logo.png +0ms
images-responsiver:info Transforming colorful-netherlands.jpg +2ms
images-responsiver:warning The image should have a width attribute: colorful-netherlands.jpg +1ms
```

`images-responsiver` (on which this plugin is based) uses the great [debug](https://github.com/visionmedia/debug) module to provide these debug messages.

You can use different values for `DEBUG=`:

| `DEBUG=*` | get all messages, even from Eleventy and other packages |
| `DEBUG=images-responsiver:*` | get all messages, only from `images-responsiver` |
| `DEBUG=images-responsiver:info` | get only information messages from `images-responsiver` |
| `DEBUG=images-responsiver:warning` | get only warning messages from `images-responsiver` |
| `DEBUG=images-responsiver:error` | get only error messages from `images-responsiver` |
| `DEBUG=images-responsiver:error,images-responsiver:warning` or `DEBUG=images-responsiver:*,-images-responsiver:info` | get only warning and error messages from `images-responsiver` |
