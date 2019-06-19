# Spark Toolbox

[![Build Status](http://img.shields.io/travis/spark-engine/toolbox.svg?style=flat-square)](https://travis-ci.org/spark-engine/toolbox)

The toolbox is a small collection of tools (and polyfils) to simplify front-end development.

This library uses polyfills to add native support for `Element.classlist()`, `Element.closest()`, `Element.matches()`, and `Object.assign`.

## Dom Tools

Simple tools for working with the DOM.

- `getClosest(el, selector)` - Provides browser support for `Element.cloest()` - a DOM method that returns the current element if it matches the given selector, or else the closest ancestor element that matches the given selector, or else null.
- `childOf(el, parent)` - Returns true if an element is a child of another element.
- `isElement(el)` - Returns true if an object is of type HTML Element.
- `formData(el)` - Returns [formData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) for ajax form submission, assembled from all inputs beneath a given element. If any input is disabled or a child of a `[disabled]` element, they are omitted.

## Object Tools

Simple tools to make working with objects easier.

### `merge(object, object, [object, …])`

This relies on `Object.assign` and exists becuase `Object.assign` modifies the first object in the arguments, which isn't often what I want. This merges objects, returning a new merged object without modifying any object passed.

```javascript
Object.assign(a, b)      // Returns `a`, merged with `b` but modifies references to `a`.
Object.assign({}, a, b)  // Equivilent to `merge(a, b)`, does not modify either object.
```

The second option is often what I want, but it looks very strange to merge objects with an empty object. This is
where I wish Javascript worked like Ruby and I could have `merge` and `merge!`. Alas.

### `slice(obj, [length])`

Easy access to `Array.prototype.slice` for converting objects into arrays of values which is useful for casting
collections of DOM tree nodes.

### `each(obj, func)`

Under the hood this maps to `Array.prototype.forEach.call(obj, func)`, which is casts DOM tree nodes as an array
before iterating. It mostly exists to improve the readabilty of code.

### `scrollTo(to, options)`

This scrolls the document (or an element) to a y-coordinate or another element with an ease function.

Arguments:

- `to` - a y-coordinate or DOM element.

Options:

- `callback: function` - function to trigger on complete
- `duration: 500` - time in milliseconds to scroll (default: 500)
- `scroll: element` - element to scroll (default: document root)
