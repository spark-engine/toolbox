require('./lib/shims/_element.classlist')

const scrollTo = require('./lib/scrollto'),
      fromTop  = require('./lib/fromtop'),
      ease     = require('./lib/ease')
      dom      = require('./lib/dom'),
      obj      = require('./lib/object')

// Merge object tools and DOM tools into one exported API
module.exports = obj.merge(obj, dom, {
  scrollTo: scrollTo,
  fromTop: fromTop,
  ease: ease
})
