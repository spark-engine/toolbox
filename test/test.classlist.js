var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')


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
