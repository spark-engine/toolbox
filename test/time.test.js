var time = require('../').time

var date = time.parse('1993-10-12 05:34:21')

test( 'parses a time', () => {
  expect( date.day ).toBe( 12 )
})

test( 'compares times', () => {
  expect( time.isAfter( new Date(), '1991-10-10' )).toBe( true )
  expect( time.isBefore( new Date(), '2991-10-10' )).toBe( true )
  expect( time.isBetween( new Date(), '1991-10-10', '2991-10-10' )).toBe( true )
})
