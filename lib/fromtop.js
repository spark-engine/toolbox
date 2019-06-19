// Get the distance from the top of the window.
module.exports = function(el) {
  return Math.round(el.getBoundingClientRect().top + window.pageYOffset)
}
