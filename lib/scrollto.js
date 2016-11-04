var ease = require( './ease' )

function move(amount) {

  // Scroll all because document.scrollingElement is still expiremental
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;

}

function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

function scrollTo(to, callback, duration) {

  // Making args flexible
  //
  // Allow for element or y-coordinates
  if( typeof( to ) === 'object' ) { to = fromTop( to ) }

  // Accept duration as the second argument
  if( typeof( callback ) === 'number' ) { duration = callback; callback = null }

  // Default duration = 500
  duration = ( typeof( duration ) === 'undefined' ) ? 500 : duration

  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;


  var animateScroll = function() {

    // increment the time
    currentTime += increment

    // find the value with the quadratic in-out easing function
    var val = ease.default(currentTime, start, change, duration)

    // move the document.body
    move(val);

    // do the animation unless its over
    if ( currentTime < duration ) {
      requestAnimationFrame( animateScroll )
    } else {
      if ( callback && typeof( callback ) === 'function') {
        callback()
      }
    }
  }

  animateScroll()
}
