var assert = require('chai').assert
var toolbox = require('../')

describe( 'Toolbox', function(){

  describe( '.getClosest', function() {
    document.body.insertAdjacentHTML('beforeend', "<p class='grandpa person'><span class='dad person'><span class='cub'></span></span></p>")

    var cub = document.querySelector('.cub')
    var dad = document.querySelector('.dad')
    var grandpa = document.querySelector('.grandpa')

    it('finds closest element', function(){
      assert.equal( toolbox.getClosest( cub, 'p' ), grandpa )
    })

    it('finds closest class', function(){
      assert.equal( toolbox.getClosest( cub, '.person' ), dad )
    })

    it('finds closest class', function(){
      assert.notEqual( toolbox.getClosest( cub, '.grandpa' ), dad )
    })

    document.body.removeChild(grandpa)
  })


  describe( '.matches', function() {
    document.body.insertAdjacentHTML('beforeend', "<div id='food' class='toast bread' data-yummy='yes'></div>")

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

    var testObject = Object.assign( {}, hashA, hashB )

    assert.equal( originHashA, hashA )
    assert.equal( originHashB, hashB )
    assert.equal( testObject.a, 'good' )

  })

  describe( 'classList', function() {

    document.body.insertAdjacentHTML('beforeend', "<div class='toast'></div>")
    var el = document.querySelector('.toast')

    el.classList.add( 'bread' )
    assert.equal( el.className, 'toast bread' )

    el.classList.toggle( 'bread' )
    assert.equal( el.className, 'toast' )

    assert.isTrue( el.classList.contains('toast') )

  })

})

