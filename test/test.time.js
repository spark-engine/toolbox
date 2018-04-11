var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

describe( 'time', function() {

  it('parses a time', function() {
    assert.equal( toolbox.time.parse('2017-10-14 09:30:33').day, 14 )
  })

})

