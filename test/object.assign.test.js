var toolbox = require('../')

var hashA = { a: 'bad', c: 'cool' }
var originHashA = hashA
var hashB = { a: 'good', b: 'awesome' }
var originHashB = hashB

test('merges hashes', ()=> {

  var testObject = Object.assign({}, hashA, hashB)

  expect(originHashA).toBe(hashA)
  expect(originHashB).toBe(hashB)
  expect(testObject.a).toBe('good')
})
