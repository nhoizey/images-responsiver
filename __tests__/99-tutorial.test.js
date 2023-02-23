'use strict';

const prettier = require('prettier');
const imagesResponsiver = require('../index');

function cleanHtml(html) {
	return prettier.format(html, { parser: 'html' });
}

describe('tutorial 2', () => {
	test('selector', () => {
		const content = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>images-responsiver</title>
    <link rel="stylesheet" href="assets/styles.css" />
  </head>

  <body>
    <div class="container">
      <h1>images-responsiver</h1>
      <p><img src="assets/my-logo.png" alt="My logo" class="logo"></p>
      <p><code>images-responsiver</code> is <strong>a simple solution for most responsive images needs</strong>. It transforms simple <code>&lt;img src=&quot;…&quot; /&gt;</code> HTML tags into better responsive images syntax with <code>srcset</code> and <code>sizes</code> attributes.</p>
      <p>Here is a simple image:</p>
      <p><img src="assets/colorful-netherlands.jpg" alt="A photo of colorful houses in Groningen, The Netherlands"></p>
      <p>Download the photo for free <a href="https://unsplash.com/photos/0jj1xNsSOBo">on Unsplash</a>.</p>
    </div>
  </body>
</html>
`;
		const transformed = imagesResponsiver(content);

		expect(cleanHtml(transformed)).toMatchSnapshot();
	});
});
