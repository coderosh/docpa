# Docpa

> A simple library that I use for web scraping. Uses htmlparser2 to parse dom.

### Usage

```js
const Docpa = require("docpa")

const doc = new Docpa(`<html>...</html>`)

// Available methods/properties
doc.getAttribute
doc.hasAttribute
doc.querySelector
doc.querySelectorAll
doc.parentElement
doc.prevSibling
doc.nextSibling
doc.className
doc.classList
doc.tagName
doc.id
doc.innerText
doc.textContent
doc.innerHTML
doc.outerHTML
doc.children
doc.firstChild
doc.lastChild
```

### License

MIT
