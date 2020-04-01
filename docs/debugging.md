| **[<< Back home](/images-responsiver/#documentation)** | **[< Examples](/images-responsiver/examples.html)** |

# Debugging

You can run `images-responsiver` in debug mode to get informations and warnings about your HTML or options.

Add `DEBUG=*` in front of the command to get messages in the console. For example, replace `node run.js` with `DEBUG=* node run.js` to get messages like these:

```bash
images-responsiver:info Transforming my-logo.png +0ms
images-responsiver:warning The image should have a width attribute: my-logo.png +0ms
images-responsiver:info Transforming colorful-netherlands.jpg +2ms
images-responsiver:warning The image should have a width attribute: colorful-netherlands.jpg +1ms
```

`images-responsiver` uses the great [debug](https://github.com/visionmedia/debug) module to provide these debug messages.

You can use different values for `DEBUG=`:

| _ | get all messages, even from other packages |
| images-responsiver:_ | get all messages, only from `images-responsiver` |
| images-responsiver:info | get only information messages from `images-responsiver` |
| images-responsiver:warning | get only warning messages from `images-responsiver` |
| images-responsiver:error | get only error messages from `images-responsiver` |

| **[Back home >>](/images-responsiver/#documentation)** |
