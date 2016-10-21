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

  describe( 'trailing: true', function() {

    var incrementCounter = toolbox.debounce( increment, 5, { trailing: true })
    
    it('prevents debounce function from firing if intervals are too close together', function(done) {

      // Test every 4 miliseconds (too short to trigger debounce) expecting 0
      utils.testInterval ( incrementCounter, function() { return count.textContent }, { interval: 4, expected: '0' } )
      setTimeout( done, 20 )

    })

    it('fires debounce function if intervals are far apart', function(done) {

      // Test every 7 miliseconds (should trigger debounce) expecting 2
      utils.testInterval ( incrementCounter, function() { return count.textContent }, { interval: 7, expected: '3', delay: 15 } )

      // note the third debounced function call is delayed so it is not expected
      setTimeout( done, 20 )

    })
  })
})
