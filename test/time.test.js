var time = require('../').time
var DateTime = require( 'luxon' ).DateTime

test( 'parses a time', () => {
  expect( time.parse('1993-10-12 05:34:21') ).toBeTruthy()
  expect( time.parse('1993-10-12 05:34:21').day ).toBe( 12 )
  expect( time.parse('2018-04-25T22:15:21.796Z').day ).toBe( 25 )
  expect( time.parse('1524694729228').day ).toBe( 25 )
})

test( 'rejects an invalid time', () => {
  expect( time.parse('test') ).toBeFalsy()
})

test( 'compares times', () => {
  expect( time.isAfter( new Date(), '1991-10-10' )).toBe( true )
  expect( time.isBefore( new Date(), '2991-10-10' )).toBe( true )
  expect( time.isBetween( new Date(), '1991-10-10', '2991-10-10' )).toBe( true )
})
