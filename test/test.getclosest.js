var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

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

  it('finds closest element', function(){
    assert.equal( toolbox.getClosest( inner, outer ), outer )
  })

})
