var assert = require('chai').assert
var toolbox = require('../')
var utils = require('./_utils')

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
