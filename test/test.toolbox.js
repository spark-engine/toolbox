var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')


describe( 'Toolbox', function(){

  afterEach( function() {

    // Clean up DOM
    Array.prototype.forEach.call( document.querySelectorAll('body > *'), function ( node ) { 
      document.body.removeChild(node)
    })

  })

  describe( '.getClosest', function() {

    utils.injectHTML( "<p class='outer widget'><span class='middle widget'><span class='inner'></span></span></p>" )

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

    utils.injectHTML( "<div id='food' class='toast bread' data-yummy='yes'></div>" )

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

})

