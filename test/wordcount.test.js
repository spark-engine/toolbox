var toolbox = require('../')

test( 'counts words', ()=> {
  expect( toolbox.wordCount( 'howdy y\'all' ) ).toBe( 2 )
})
