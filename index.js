require( './lib/shims/_classlist' )

var event    = require( 'compose-event' )
var merge    = require( './lib/shims/_object.assign' )
var scrollTo = require( './lib/scrollto' )
var ease     = require( './lib/ease' )

var toolbox = {

  event: event,
  scrollTo: scrollTo,
  merge: merge,
  ease: ease,

  // Get closest DOM element up the tree that matches a given selector
  getClosest: function ( el, selector ) {
    for ( ; el && el !== document; el = el.parentNode ) {
      if ( toolbox.matches( el, selector ) ) return el;
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

  wordCount: function( str ) {
    var matches = str.match( /\S+/g );
    return matches ? matches.length : 0;
  },

  fromTop: function( el ) {
    return Math.round( el.getBoundingClientRect().top + window.pageYOffset );
  }

}


module.exports = toolbox
