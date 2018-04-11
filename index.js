// Shims
require( './lib/shims/_classlist' )
var merge    = require( './lib/shims/_object.assign' ),
    event    = require( 'compose-event' ),
    luxon    = require( 'luxon' ),
    time     = merge(require( './lib/time' ), luxon),
    scrollTo = require( './lib/scrollto' ),
    fromTop  = require( './lib/fromtop' ),
    ease     = require( './lib/ease' )

var toolbox = {

  event: event,
  scrollTo: scrollTo,
  fromTop: fromTop,
  merge: merge,
  ease: ease,
  time: time,

  // Get closest DOM element up the tree that matches a given selector
  getClosest: function ( el, selector ) {
    for ( ; el && el !== document; el = el.parentNode ) {
      if ( toolbox.matches( el, selector ) ) return el
    }
    return false
  },

  childOf: function ( el, parent ) {
    for ( ; el && el !== document; el = el.parentNode ) {
      if ( el == parent ) return true;
    }
    return false
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

  wordCount: function( str ) {
    var matches = str.match( /\S+/g );
    return matches ? matches.length : 0;
  },

  // Easy access to slice for converting objects into arrays of values.
  slice: function( obj, count ) {
    return Array.prototype.slice.call( obj, count )
  },

  each: function( collection, callback ) {
    return Array.prototype.forEach.call( collection, callback )
  },

  formData: function( rootEl ) {
    var formData  = new FormData(),
        fields = rootEl.querySelectorAll( 'input[name]' )

    // Loop over fields
    toolbox.each( fields, function( field ) {
      // Append current field’s name/value to new formData object
      formData.append( field.name, field.value );
    })

    // Then return said formData object
    return formData;
  }

}


module.exports = toolbox
