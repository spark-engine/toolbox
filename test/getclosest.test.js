var toolbox = require('../')
var utils = require('./_utils')

utils.injectHTML( "<p class='outer widget'><span class='middle widget'><span class='inner'></span></span></p>" )

var outer = document.querySelector('.outer')
var middle = document.querySelector('.middle')
var inner = document.querySelector('.inner')

test('finds closest element', function(){
  expect( toolbox.getClosest( inner, 'p' )).toBe( outer )
})

test('finds closest class', function(){
  expect( toolbox.getClosest( inner, '.widget' )).toBe( middle )
})

test('finds closest class', function(){
  expect( toolbox.getClosest( inner, '.outer' )).toBe( outer )
})
