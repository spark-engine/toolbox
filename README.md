# Spark Toolbox

[![Build Status](http://img.shields.io/travis/spark-engine/toolbox.svg?style=flat-square)](https://travis-ci.org/spark-engine/toolbox)

A small collection of tools to simplify front-end development.

### `scrollTo(to, options)`

This scrolls the document (or an element) to a y-coordinate or another element with an ease function.

Arguments:

- `to` - a y-coordinate or DOM element.

Options:

- `callback` - function to trigger on complete
- `duration` - time in milliseconds to scroll (default: 500)
- `scroll` - element to scroll (default: document root)

## Dom Tools

Here are some simple tools for working with the DOM.

### `getClosest`

### `childOf`

### `getNext`

### `matches`

### `isElement`

### `formData`

## Object Tools

Here are a few tools to make working with objects easier.

### `merge`

This is a polyfill for `Object.extend`, but doesn't modify objects and instead returns a new merged object.

### `slice`

Easy access to `Array.prototype.slice` for converting objects into arrays of values which is useful for iterating
over DOM tree nodes.

### `each`

Easy access to `Array.prototype.forEach`, which is useful for iterating over DOM tree nodes or any array.

### `wordCount`

It simply returns the number of space separated word characters in a string.
