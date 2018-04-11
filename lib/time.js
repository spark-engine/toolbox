var DateTime = require( 'luxon' ).DateTime

function isBefore( end, date ) {
  date = parse( date )
  date == DateTime.min( end, date )
}

function isAfter( start, date ) {
  date = parse( date )
  date == DateTime.max( start, date )
}

function isBetween( start, end, date, zone) {
  date = parse( date )
  DateTime.max( start, date ) == DateTime.min( date, end )
}

function parse( date ) {
  var formats = [ "fromISO", "fromSQL", "fromHTTP", "fromRFC2822", "fromMillis" ],
      parsedDate

  if ( typeof date == 'object' ) {
    if ( date.toISO ) return date
    parsedDate = DateTime.fromObject( date )

  } else {
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
