var toolbox = require('../')
var utils = require('./_utils')

utils.injectHTML("<div id='food' class='toast bread' data-yummy='yes'></div>")
div = document.querySelector('#food')

test('matches classnames', function() {
  expect(toolbox.matches(div, '.toast')).toBeTruthy()
  expect(toolbox.matches(div, '.anchovies')).toBeFalsy()
})

test('matches attributes', function() {
  expect(toolbox.matches(div, '[data-yummy]')).toBeTruthy()
  expect(toolbox.matches(div, '[data-yummy=yes]')).toBeTruthy()
  expect(toolbox.matches(div, '[data-yummy=no]')).toBeFalsy()
})

test('matches ids', function() {
  expect(toolbox.matches(div, '#food')).toBeTruthy()
  expect(toolbox.matches(div, '#garbage')).toBeFalsy()
})
