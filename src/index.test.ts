import Docpa from "./index"

let doc: Docpa
const html = `<html lang="en">
<head>
  <title>Homepage</title>
</head>
<body>
  <h1 style="text-transform: uppercase">Hello World</h1>
  <div class="container">
    <nav class="navbar p-5">
      <h1 id="nav-logo">Logo</h1>
      <ul id="nav-items">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  </div>
</body>
</html>
`
beforeAll(() => {
  doc = new Docpa(html)
})

describe("Docpa", () => {
  test("innerHtml should work", () => {
    expect(doc.querySelector("body")?.innerHTML.trim()).toMatchInlineSnapshot(`
      "<h1 style=\\"text-transform: uppercase\\">Hello World</h1>
        <div class=\\"container\\">
          <nav class=\\"navbar p-5\\">
            <h1 id=\\"nav-logo\\">Logo</h1>
            <ul id=\\"nav-items\\">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        </div>"
    `)
  })

  test("textContent should work", () => {
    expect(doc.querySelector("h1")?.textContent).toBe("Hello World")
  })

  test("innerText should work", () => {
    // Doesn't work (domutils.innerText doesn't implement this)
    // expect(doc.querySelector("h1")?.textContent).toBe("HELLO WORLD")
    expect(doc.querySelector("h1")?.innerText).toBe("Hello World")
  })

  test("outerHTML should work", () => {
    expect(doc.querySelector("h1")?.outerHTML).toBe(
      `<h1 style="text-transform: uppercase">Hello World</h1>`
    )
  })

  test("tagName should work", () => {
    expect(doc.querySelector("h1")?.tagName).toBe("h1")
  })

  test("parentElement should work", () => {
    expect(doc.querySelector("#nav-logo")?.parentElement?.tagName).toBe("nav")
  })

  test("getAttribute should work", () => {
    expect(doc.querySelector("nav")?.getAttribute("class")).toBe("navbar p-5")
  })

  test("className should work", () => {
    expect(doc.querySelector("nav")?.className).toBe("navbar p-5")
    expect(doc.querySelector("h1")?.className).toBe("")
  })

  test("classList should work", () => {
    expect(doc.querySelector("nav")?.classList).toEqual(["navbar", "p-5"])
  })

  test("id should work", () => {
    expect(doc.querySelector("#nav-logo")?.id).toBe("nav-logo")
    expect(doc.querySelector("h1")?.id).toBe("")
  })

  test("prevSubling should work", () => {
    expect(doc.querySelector("#nav-items")?.prevSibling?.id).toBe("nav-logo")
  })

  test("nextSibling should work", () => {
    expect(doc.querySelector("#nav-logo")?.nextSibling?.id).toBe("nav-items")
  })

  test("children getter should work", () => {
    expect(doc.querySelector("#nav-items")?.children.length).toBe(4)
  })

  test("lastChild should work", () => {
    expect(doc.querySelector("body")?.lastChild?.className).toBe("container")
  })

  test("firstChild should work", () => {
    expect(doc.querySelector("body")?.firstChild?.tagName).toBe("h1")
  })

  test("hasAttribute should work", () => {
    expect(doc.querySelector("body")?.hasAttribute("data-mode")).toBe(false)
  })

  test("querySelectorAll should work", () => {
    expect(doc.querySelectorAll("li").length).toBe(4)
  })

  test("should return null on wrong query", () => {
    expect(doc.querySelector("strong")).toBe(null)
  })
})
