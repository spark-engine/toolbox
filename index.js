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
        fields = toolbox.slice(rootEl.querySelectorAll( 'input[name]:not([disabled]), select[name]:not([disabled]), textarea[name]:not([disabled])' ))
    var fieldData = {}

    // Remove any field which has a parent which is disabled
    fields = fields.filter( function( f ) { return !toolbox.getClosest(f, '[disabled]') })

    // Loop over fields
    // reverse them because if there are two inputs with the same name
    // the last input overrides the first.
    fields.reverse().forEach( function( field ) {
      if ( toolbox.matches( field, '[type=radio], [type=checkbox]') ) {
        // If this is a checkbox or radio input, overwrite with checked values
        if ( field.checked ) fieldData[field.name] = field
      } else {
        // Only add one value per field name
        fieldData[field.name] = fieldData[field.name] || field
      }
    })

    for ( var name in fieldData ) {
      // Append current field’s name/value to new formData object
      formData.append( name, fieldData[name].value );
    }

    // Then return said formData object
    return formData;
  }

}


module.exports = toolbox
