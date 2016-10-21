var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( 'throttle', function() {

  var counter = 0,                                           // Track events triggered
      count   = utils.injectHTML( "<div id='count'>0</div>" )  // Element for counting triggers

  // This is the function we'll be debouncing
  var increment = function() {
    counter += 1
    count.textContent = counter
  }

  // Repeat a function options.count every options.interval after options.delay
  var incrementCounter = toolbox.throttle( increment, 10 )
    
  it('fires one debounce function if intervals are too close together', function(done) {

    // Test every 5 miliseconds (should trigger half) expecting 4 (because last is fired after measured)
    utils.testInterval ( incrementCounter, function() { return count.textContent }, { count: 9, interval: 4, expected: '4' } )
    setTimeout( done, 40 )

  })
})
