const { parseHTML } = require('linkedom');
const { document } = parseHTML(`<!DOCTYPE html>
<html>
<body>
  <img src="test.png" data-responsiver="transform" />
</body>
</html>`);

document.querySelectorAll('img').forEach((image) => {
  console.log('responsiver' in image.dataset);
  console.dir(Object.keys(image.dataset));
  console.log(image.dataset.responsiver);
  delete image.dataset.responsiver;
  console.log(image.dataset.responsiver);
  console.dir(Object.keys(image.dataset));
});