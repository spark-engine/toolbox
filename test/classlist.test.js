var toolbox = require('../')

document.body.insertAdjacentHTML('beforeend', "<div class='toast'></div>")
var el = document.querySelector('.toast')

test('adds classes', function() {
  el.classList.add('bread')
  expect(el.className).toBe('toast bread')
})

test('toggles classes', function() {
  el.classList.toggle('bread')
  expect(el.className).toBe('toast')
})

test('checks classnames', function() {
  expect(el.classList.contains('toast')).toBeTruthy()
  expect(el.classList.contains('elves')).toBeFalsy()
})

