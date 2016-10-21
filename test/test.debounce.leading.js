var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( 'debounce', function() {

  var counter = 0,                                           // Track events triggered
      count   = utils.injectHTML( "<div id='count'>0</div>" )  // Element for counting triggers

  // This is the function we'll be debouncing
  var increment = function() {
    counter += 1
    count.textContent = counter
  }

  describe( 'leading: true', function() {

    var incrementCounter = toolbox.debounce( increment, 5, { leading: true })
    
    it('fires one debounce function if intervals are too close together', function(done) {

      // Test every 4 miliseconds (too short to trigger debounce) expecting 0
      utils.testInterval ( incrementCounter, function() { return count.textContent }, { interval: 4, expected: '1' } )
      setTimeout( done, 20 )
    })
  })
})
