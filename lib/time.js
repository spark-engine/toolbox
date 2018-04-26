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

function isBetween( date, date1, date2 ) {
  date = parse( date )
  date1 = parse( date1 )
  date2 = parse( date2 )

  if ( date.isValid && date1.isValid && date2.isValid ) {
    // Determine start and end dates (to allow any order in args)
    var start = DateTime.min( date1, date2 )
    var end = DateTime.max( date1, date2 )

    return DateTime.max( start, date ) == DateTime.min( date, end )
  } else {
    return false
  }
}

function parse( date, options ) {
  var formats = [ "fromISO", "fromSQL", "fromHTTP", "fromRFC2822" ],
      parsedDate

  options = options || {}

  if ( typeof date == 'object' ) {
    
    if ( date.toISO ) return date
    
    // Parse object { year: 2005, month: 12, … }
    parsedDate = DateTime.fromObject( date, options )

  // Parse from milliseconds Epoc time
  } else if ( !isNaN( date ) ) {
    parsedDate = DateTime.fromMillis( Number( date ), options )

  // Parse string formats
  } else {
    formats.forEach( function( format ) {
      if ( !parsedDate || !parsedDate.isValid ) {
        parsedDate = DateTime[format]( date, options )
      }
    })
  }

  return parsedDate.isValid ? parsedDate : false
}

// Remove insignificant digits
function prettyPrint( date, options ) {
  date = parse( date, options )

  if (options && options.zone) date = date.setZone(options.zone)

  if ( date ) {
    return date.toISO().replace('T', ' ').replace('.000',' ').replace(':00 ',' ')
  } else {
    return "Unparseable date string" 
  }
}

module.exports = {
  isBefore: isBefore,
  isAfter: isAfter,
  isBetween: isBetween,
  parse: parse,
  prettyPrint: prettyPrint
}
