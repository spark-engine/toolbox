var assert = require('chai').assert
var toolbox = require('../')

require('./_custom_event')

var injectHTML = function(html) {
  document.body.insertAdjacentHTML('beforeend', html)
  return document.body.lastChild
}

var now = function() {
  return Date.now();
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

    count = injectHTML( "<div id='count'>0</div>" )

    var counter = 0
    var increment = function() {
      counter += 1
      count.textContent = counter
    }

    var add = new CustomEvent('add')
    var trigger = function(timeout) {
      setTimeout( function(){ document.body.dispatchEvent(add); }, timeout )
    }

    var debouncedIncrement = toolbox.debounce( increment, 5, { trailing: true })
    document.body.addEventListener('add', debouncedIncrement)

    it('only fires at the correct intervals', function(done) {

      trigger(1)    // ignored because it hasn't been long enough since last event

      trigger(2)    // Fire debounce
      trigger(10)   // Fire debounce

      trigger(11)   // ignored because it hasn't been long enough since last event
      trigger(18)   // Fire debounce

      setTimeout(function() {

        assert.equal( count.textContent, '3' )
        done()

      }, 40)
    })

  })

})

