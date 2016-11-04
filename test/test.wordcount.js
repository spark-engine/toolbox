var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( 'wordCount', function() {

  it( 'counts words', function() {
    assert.equal( toolbox.wordCount( 'howdy y\'all' ), 2 )
  })
})
