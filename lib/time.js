var DateTime = require( 'luxon' ).DateTime

function isBefore( date, end ) {
  end = parse( end )
  date = parse( date )
  return date == DateTime.min( end, date )
}

function isAfter( date, start ) {
  start = parse( start )
  date = parse( date )
  return date == DateTime.max( start, date )
}

function isBetween( date, start, end ) {
  start = parse( start )
  end  = parse( end )
  date = parse( date )
  return DateTime.max( start, date ) == DateTime.min( date, end )
}

function parse( date ) {
  var formats = [ "fromISO", "fromSQL", "fromHTTP", "fromRFC2822", "fromMillis" ],
      parsedDate

  if ( typeof date == 'object' ) {
    if ( date.toISO ) return date
    parsedDate = DateTime.fromObject( date )

  } else {
    date = String( date )
    formats.forEach( function( format ) {
      if ( !parsedDate || parsedDate.invalid ) {
        parsedDate = DateTime[format]( date, { locale: 'en-us' } )
      }
    })
  }

  if ( !parsedDate.invalid )
    return parsedDate
  else
    return false
}

module.exports = {
  isBefore: isBefore,
  isAfter: isAfter,
  isBetween: isBetween,
  parse: parse
}
