var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( 'debounce', function() {

  var counter,                                           // Track events triggered
      interval,                                          // Select an interval for repeat functions
      count   = utils.injectHTML( "<div id='count'>0</div>" )  // Element for counting triggers

  // This is the function we'll be debouncing
  var increment = function() {
    counter += 1
    count.textContent = counter
  }

  // Repeat a function options.count every options.interval after options.delay
  var testInterval = function ( func, options ) {

    counter = 0
    options = Object.assign( {}, { count: 3, delay: 0 }, options )

    setTimeout( function() { 

      utils.repeat( func, options.count, options.interval, function() {
        // Test that the count equals expected results
        assert.equal( count.textContent, options.expected )
      })

    }, options.delay )

  }

  describe( 'leading: true', function() {

    var incrementCounter = toolbox.debounce( increment, 5, { leading: true })
    
    it('fires one debounce function if intervals are too close together', function(done) {

      // Test every 4 miliseconds (too short to trigger debounce) expecting 0
      testInterval ( incrementCounter, { interval: 4, expected: '1' } )
      setTimeout( done, 20 )

    })
  })
})
