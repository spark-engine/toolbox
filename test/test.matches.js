var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

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
