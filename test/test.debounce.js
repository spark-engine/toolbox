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

  describe( 'trailing: true', function() {

    var incrementCounter = toolbox.debounce( increment, 5, { trailing: true })
    
    it('prevents debounce function from firing if intervals are too close together', function(done) {

      // Test every 4 miliseconds (too short to trigger debounce) expecting 0
      testInterval ( incrementCounter, { interval: 4, expected: '0' } )
      setTimeout( done, 20 )

    })

    it('fires debounce function if intervals are far apart', function(done) {

      // Test every 7 miliseconds (should trigger debounce) expecting 2
      testInterval ( incrementCounter, { interval: 7, expected: '2', delay: 15 } )

      // note the third debounced function call is delayed so it is not expected
      setTimeout( done, 20 )

    })
  })

  describe( 'leading: true', function() {

    var incrementCounter = toolbox.debounce( increment, 5, { leading: true })
    
    it('fires one debounce function if intervals are too close together', function(done) {

      setTimeout( function() {
        // Test every 4 miliseconds (too short to trigger debounce) expecting 0
        testInterval ( incrementCounter, { interval: 4, expected: '1' } )
        setTimeout( done, 20 )

      }, 80)
    })
  })
})
