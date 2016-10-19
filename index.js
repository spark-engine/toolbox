require('./lib/shims/_classlist')
require('./lib/shims/_object.assign.js')
var timing = require('./lib/timing.js')

var Toolbox = {

  // Get closest DOM element up the tree that matches a given selector
  getClosest: function ( el, selector ) {
    for ( ; el && el !== document; el = el.parentNode ) {
      if ( self.matches( el, selector ) ) return el;
    }
    return false;
  },

  // Get next DOM element that matches a given selector
  getNext: function( el, selector ) {
    for ( ; el && el !== document; el = el.parentNode ) {
      if ( el.querySelector( selector ) ) return el.querySelector( selector );
    }
    return false;
  },

  // Matches selector function
  // @reference https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
  matches: function ( el, selector ) {
    return ( el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector ).call( el, selector );
  },

  throttle: timing.throttle,

  debounce: timing.debounce
  
}


module.exports = self = Toolbox
