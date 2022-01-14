import type { Element, Document, Node } from "domhandler"

import selectAll, { selectOne } from "css-select"
import { parseDocument, DomUtils } from "htmlparser2"
import render from "dom-serializer"

class Docpa {
  #root: Document

  constructor(html: string)
  constructor(el: Element | Element[])
  constructor(node: Node | Node[])
  constructor(val: string | Element | Document | Node | Element[] | Node[])
  constructor(val: any) {
    if (typeof val === "string") this.#root = parseDocument(val)
    else this.#root = val
  }

  querySelector(query: string) {
    return createDocument(selectOne(query, this.#root))
  }

  querySelectorAll(query: string) {
    return selectAll(query, this.#root).map((a) => createDocument(a))
  }

  get textContent() {
    return DomUtils.textContent(this.#root)
  }

  get innerText() {
    return DomUtils.innerText(this.#root)
  }

  get outerHTML() {
    return render(this.#root)
  }

  get innerHTML() {
    return render(this.#root.children)
  }

  get parentElement() {
    return createDocument(DomUtils.getParent(this.#root))
  }

  get prevSibling() {
    return createDocument(DomUtils.prevElementSibling(this.#root))
  }

  get nextSibling() {
    return createDocument(DomUtils.nextElementSibling(this.#root))
  }

  get lastChild() {
    const children = this.children
    return children[this.children.length - 1]
  }

  get firstChild() {
    return this.children[0]
  }

  get children() {
    return DomUtils.getChildren(this.#root)
      .map((a) => createDocument(a))
      .filter((a) => a?.tagName)
  }

  get tagName() {
    return DomUtils.getName(this.#root as Element)
  }

  get className() {
    return this.getAttribute("class") || ""
  }

  get id() {
    return this.getAttribute("id") || ""
  }

  get classList() {
    return [...new Set(this.className.split(" "))]
  }

  getAttribute(name: string) {
    return DomUtils.getAttributeValue(this.#root as Element, name)
  }

  hasAttribute(name: string) {
    return DomUtils.hasAttrib(this.#root as Element, name)
  }
}

function createDocument(
  val?: null | ConstructorParameters<typeof Docpa>[0]
): Docpa | null {
  if (!val && typeof val !== "string") return null
  return new Docpa(val)
}

export = Docpa
