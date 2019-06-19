// easing functions http://gizma.com/easing/
var ease = {
  inOutQuad: function (t, b, c, d) {
    t /= d/2
    if (t < 1) { return c/2*t*t + b }
    t--
    return -c/2 * (t*(t-2) - 1) + b
  },

  inOutCubic: function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
  },

  inOutQuint: function(t, b, c, d) {
    var ts = (t/=d)*t,
    tc = ts*t;
    return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
  },

  inOutCirc: function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
  }
}

ease.default = ease.inOutQuad

module.exports = ease
