const ease     = require('./ease'),
      fromTop  = require('./fromtop'),
      duration = 500

function move(amount, element) {
  if (element) {
    return element.scrollTop
  }
  // Scroll all because document.scrollingElement is still expiremental
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
}

function position(element) {
  return scrollElement(element).scrollTop
}

function scrollElement(element) {
  if (element) { return element }
  else if (document.documentElement.scrollTop) return document.documentElement
  else if (document.parentNode.scrollTop) return document.parentNode
  else if (document.body.scrollTop) return document.body
}

// Scroll to a position or element.
//
// Arguments:
//  - to: a y coordiante, or a DOM element
//  - options:
//     callback: callback to trigger on complete
//     duration: time in ms to scroll (default: 500)
//     scroll: element to scroll (default: document root)
//
function scrollTo(to, options) {

  // Making args flexible
  //
  // Allow for element or y-coordinates
  if(typeof(to) === 'object') { to = fromTop(to) }

  // Default duration = 500
  options.duration = options.duration || duration

  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function() {
    // increment the time
    currentTime += increment

    // find the value with the quadratic in-out easing function
    var val = ease.default(currentTime, start, change, options.duration)

    // move the document.body
    move(val, options.scroll);

    // do the animation unless its over
    if (currentTime < options.duration) {
      requestAnimationFrame(animateScroll)
    } else {
      if (options.callback && typeof(callback) === 'function') {
        options.callback()
      }
    }
  }

  animateScroll()
}

module.exports = scrollTo
