---
title: Advanced Markdown Test for Tailwind Typography
description: "Testing the rendering of code blocks, tables, and other elements with custom Tailwind CSS typography."
date: June 1 2023
image: "https://i.imgur.com/8EF8K0B.jpeg"
---

Something has always existed. According to physics, there can never be true physical nothingness—though there can be times when existence resembles nothing, such as a vacuum (the state of minimum possible energy) (Phys.org). Creating a space where there are no quantum fluctuations requires an enormous amount of energy, and there would be a remnant of that energy in that space afterwards if the fluctuations were flushed out, plus an unstable environment (1veritasium). Even on computers, deleted data is not actually tossed away, by rather written over.

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Horizontal Rules

---

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Blockquotes

> This is a blockquote.
>
> > This is

> > a nested blockquote.

## Lists

Unordered

- Item 1
- Item 2
  - Sub-item 1
  - Sub-item 2
    - Sub-sub-item 1
    - Sub-sub-item 2

Ordered

1. First item
2. Second item
3. Third item

## Code

Inline `code example`

### Indented Code Block

    // This is an indented code block
    function example() {
      console.log("Hello, world!");
    }

### Block Code Fences

```
function example() {
  console.log("Hello, world!");
}
```

### Syntax Highlighting

```js
const longFunctionName = (param1, param2, param3, param4, param5) => {
  if (param1 && param2 && param3 && param4 && param5) {
    console.log("This is a very long line of code to test the rendering capabilities of the custom Tailwind Typography settings. We want to ensure that even long lines of code are displayed correctly and do not overflow or cause any layout issues in the rendered output.");
  } else {
    console.log("Some parameters are missing.");
  }
};

longFunctionName(true, true, true, true, true);
```

```python
def long_function_name(param1, param2, param3, param4, param5):
    if param1 and param2 and param3 and param4 and param5:
        print("This is a very long line of code to test the rendering capabilities of the custom Tailwind Typography settings. We want to ensure that even long lines of code are displayed correctly and do not overflow or cause any layout issues in the rendered output.")
    else:
        print("Some parameters are missing.")

long_function_name(True, True, True, True, True)
```

### Block Code Fences with Different Languages

```ts
type Person = {
  name: string;
  age: number;
  occupation?: string;
};

const examplePerson: Person = {
  name: "Alice",
  age: 30,
  occupation: "Engineer",
};

console.log(examplePerson);
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a paragraph in HTML.</p>
</body>
</html>
```

```css
body {
  font-family: 'Helvetica', 'Arial', sans-serif;
  background-color: #2d2d2d;
  color: #ffffff;
}

h1 {
  color: #ff4500;
}
```

## Example Table

Here is an example of a table in Markdown:

| Name      | Age | Occupation        |
| --------- | --- | ----------------- |
| John Doe  | 29  | Software Engineer |
| Jane Smith| 34  | Product Manager   |
| Bob Johnson | 45 | Designer          |

## Right-Aligned Columns

You can also right-align specific columns:

| Name      |       Age | Occupation        |
| --------- | --------: | ----------------- |
| John Doe  |       29  | Software Engineer |
| Jane Smith|       34  | Product Manager   |
| Bob Johnson |     45  | Designer          |

## Complex Table

Including multiple headers and varying cell content:

| Feature       | Description                                                  | Supported Versions       |
| ------------- | ------------------------------------------------------------ | ------------------------ |
| **Markdown**  | Markdown allows you to write using an easy-to-read, easy-to-write plain text format. | All versions             |
| **HTML**      | HTML is the standard markup language for creating web pages. | All versions             |
| **CSS**       | CSS is a language used to describe the style of document presentations. | All versions             |
| **JavaScript**| JavaScript is a programming language that is one of the core technologies of the World Wide Web. | ES5, ES6, ES7, ES8       |

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

---

This Markdown file tests various features, especially focusing on code blocks to ensure they render correctly with the custom Tailwind CSS typography settings.