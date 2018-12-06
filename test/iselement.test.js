var toolbox = require('../')
var utils = require('./_utils')

utils.injectHTML( "<div></div>" )
div = document.querySelector('div')

test( 'identifies elements properly', ()=> {
  expect( toolbox.isElement( div ) ).toBeTruthy()
  expect( toolbox.isElement( '' ) ).toBeFalsy()
  expect( toolbox.isElement( {} ) ).toBeFalsy()
  expect( toolbox.isElement( function(){} ) ).toBeFalsy()
})
