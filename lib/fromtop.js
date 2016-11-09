module.exports = function( el ) {
  return Math.round( el.getBoundingClientRect().top + window.pageYOffset );
}
