var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( '.childOf', function() {

  utils.injectHTML( "<p class='outer widget'><span class='middle widget'><span class='inner'></span></span></p>" )

  var outer = document.querySelector('.outer')
  var middle = document.querySelector('.middle')
  var inner = document.querySelector('.inner')

  it('finds immediate parent', function(){
    assert.isTrue( toolbox.childOf( inner, middle ) )
  })

  it('finds ancestor element', function(){
    assert.isTrue( toolbox.childOf( inner, outer ) )
  })

  it('finds no parent', function(){
    assert.isFalse( toolbox.childOf( middle, inner ) )
  })

})
