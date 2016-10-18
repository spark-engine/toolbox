require('./shims/_classlist')
require('./shims/_object.assign.js')

var Toolbox = {
  getClosest: function ( elem, selector ) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( self.matches( elem, selector ) ) return elem;
    }
    return false;
  },

  matches: function ( el, selector ) {
    return ( el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector ).call( el, selector );
  }
}


module.exports = self = Toolbox
