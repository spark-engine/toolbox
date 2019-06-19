var utils = require('./_utils')
var toolbox = require('../')

utils.injectHTML("<p class='outer widget'><span class='middle widget'><span class='inner'></span></span></p>")

var outer = document.querySelector('.outer')
var middle = document.querySelector('.middle')
var inner = document.querySelector('.inner')

test('finds immediate parent', ()=> {
  expect(toolbox.childOf(inner, middle)).toBeTruthy()
})

test('finds ancestor element', ()=> {
  expect(toolbox.childOf(inner, outer)).toBeTruthy()
})

test('finds no parent', ()=> {
  expect(toolbox.childOf(middle, inner)).toBeFalsy()
})
