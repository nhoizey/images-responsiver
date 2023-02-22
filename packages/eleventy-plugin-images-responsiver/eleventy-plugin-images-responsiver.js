'use strict';

const imagesResponsiver = require('images-responsiver');

module.exports = (eleventyConfig, options = {}) => {
	eleventyConfig.addTransform('imagesResponsiver', function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
			return imagesResponsiver(content, options);
		}
		return content;
	});
};
