const merge = require('./shims/_object.assign')

// Easy access to slice for converting objects into arrays of values.
function slice(obj, count) {
  return Array.prototype.slice.call(obj, count)
}

// Each which supports NodeLists (from a DOM query) as well as other iteratable objects.
function each(collection, callback) {
  return Array.prototype.forEach.call(collection, callback)
}

function wordCount(str) {
  var matches = str.match(/\S+/g);
  return matches ? matches.length : 0;
}

module.exports = {
  merge: merge,
  slice: slice,
  each: each,
  wordCount: wordCount
}
