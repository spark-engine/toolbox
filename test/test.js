var assert = require('chai').assert
var toolbox = require('../')

require('./_custom_event')

// Utlitiy function for easily appending to HTML
var injectHTML = function(html) {
  document.body.insertAdjacentHTML('beforeend', html)
  return document.body.lastChild
}

var repeat = function( func, count, delay, complete ) {
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

describe( 'Toolbox', function(){

  afterEach( function() {

    // Clean up DOM
    Array.prototype.forEach.call( document.querySelectorAll('body > *'), function ( node ) { 
      document.body.removeChild(node)
    })

  })

  describe( '.getClosest', function() {

    injectHTML( "<p class='outer widget'><span class='middle widget'><span class='inner'></span></span></p>" )

    var outer = document.querySelector('.outer')
    var middle = document.querySelector('.middle')
    var inner = document.querySelector('.inner')

    it('finds closest element', function(){
      assert.equal( toolbox.getClosest( inner, 'p' ), outer )
    })

    it('finds closest class', function(){
      assert.equal( toolbox.getClosest( inner, '.widget' ), middle )
    })

    it('finds closest class', function(){
      assert.notEqual( toolbox.getClosest( inner, '.outer' ), middle )
    })

  })

  describe( '.matches', function() {

    injectHTML( "<div id='food' class='toast bread' data-yummy='yes'></div>" )

    div = document.querySelector('#food')

    it('matches classnames', function() {
      assert.isTrue( toolbox.matches( div, '.toast' ) )
      assert.isFalse( toolbox.matches( div, '.anchovies' ) )
    })

    it('matches attributes', function() {
      assert.isTrue( toolbox.matches( div, '[data-yummy]' ) )
      assert.isTrue( toolbox.matches( div, '[data-yummy=yes]' ) )
      assert.isFalse( toolbox.matches( div, '[data-yummy=no]' ) )
    })

    it('matches ids', function() {
      assert.isTrue( toolbox.matches( div, '#food' ) )
      assert.isFalse( toolbox.matches( div, '#garbage' ) )
    })

  })

  describe( 'Object.assign', function() {

    var hashA = { a: 'bad', c: 'cool' }
    var originHashA = hashA
    var hashB = { a: 'good', b: 'awesome' }
    var originHashB = hashB

    it('merges hashes', function() {

      var testObject = Object.assign( {}, hashA, hashB )

      assert.equal( originHashA, hashA )
      assert.equal( originHashB, hashB )
      assert.equal( testObject.a, 'good' )
    })

  })

  describe( 'classList', function() {

    document.body.insertAdjacentHTML('beforeend', "<div class='toast'></div>")
    var el = document.querySelector('.toast')

    it('adds classes', function() {
      el.classList.add( 'bread' )
      assert.equal( el.className, 'toast bread' )
    })

    it('toggles classes', function() {
      el.classList.toggle( 'bread' )
      assert.equal( el.className, 'toast' )
    })

    it('checks classnames', function() {
      assert.isTrue( el.classList.contains('toast') )
      assert.isFalse( el.classList.contains('elves') )
    })

  })

  describe( 'debounce', function() {

    var counter,                                           // Track events triggered
        interval,                                          // Select an interval for repeat functions
        count   = injectHTML( "<div id='count'>0</div>" )  // Element for counting triggers

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

        repeat( func, options.count, options.interval, function() {
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

        }, 50)
      })
    })
  })
})

