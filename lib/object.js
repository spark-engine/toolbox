require('./shims/_object.assign')

// Easy access to slice for converting objects into arrays of values.
function slice(obj, count) {
  return Array.prototype.slice.call(obj, count)
}

// Each which supports NodeLists (from a DOM query) as well as other iteratable objects.
function each(collection, callback) {
  return Array.prototype.forEach.call(collection, callback)
}

// Make it easy to merge objects without overwriting the original objects
function merge() {
  var args = [{}].concat(slice(arguments))
  return Object.assign.apply(this, args)
}

module.exports = {
  merge: merge,
  slice: slice,
  each: each
}
