// Utlitiy function for easily appending to HTML
module.exports = {

  injectHTML: function(html) {
    document.body.insertAdjacentHTML('beforeend', html)
    return document.body.lastChild
  },

  repeat: function( func, count, delay, complete ) {
    var counter = 0
    var interval = setInterval( function() { 

      func()
      counter += 1 

      if ( count == counter ) {
        clearInterval( interval )
        if (complete) { complete() }
      }
    }, delay )
  }
}
