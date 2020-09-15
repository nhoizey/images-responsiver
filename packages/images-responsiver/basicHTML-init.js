global.window = global;

require('basichtml/src/utils').querySelectorAll = function (
  css,
  element = this
) {
  const $ = require('sizzle');
  return $(css, element);
};

const { Document } = require('basichtml');

const createDocumentFromHTML = (html, customElements) => {
  // Add `<html>…</html>` tags arround the content if they're missing,
  // to prevent issues with basicHTML
  if (!html.match(/<html(.|\n)*<\/html>/gim)) {
    html = `<!DOCTYPE html><html>${html}</html>`;
  }
  const document = new Document(customElements);
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const { attributes, children } = tmp.firstElementChild;
  document.documentElement.attributes = attributes;
  document.documentElement.append(...children);
  return (window.document = document);
};

module.exports = createDocumentFromHTML;
