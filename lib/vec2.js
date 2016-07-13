function vec2(x, y) {
  this.x = x;
  this.y = y;
}

vec2.prototype = {
  length: function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  },
  dist: function(v) {
    return Math.sqrt((v.x - this.x)*(v.x - this.x) + (v.y - this.y)*(v.y - this.y));
  },
  vecTo: function(v) {
    return new vec2(v.x - this.x, v.y - this.y);
  },
  dot: function(v) {
    return this.x*v.x + this.y*v.y;
  },
  wedge: function(v) {
    return this.x*v.y - this.y*v.x;
  },
  normal: function() {
    return new vec2(-this.y, this.x);
  },
  equal: function(v) {
    return Math.abs(this.x - v.x) < EPS && Math.abs(this.y - v.y) < EPS;
  }
}