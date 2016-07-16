function vec2(x, y) {
  this.x = x;
  this.y = y;
}

vec2.prototype = {
  translate: function(v) {
    this.x += v.x;
    this.y += v.y;
  },
  rotate: function(a) {
    var tempX = this.x;
    var tempY = this.y;
    this.x = tempX*Math.cos(a) - tempY*Math.sin(a);
    this.y = tempX*Math.sin(a) + tempY*Math.cos(a);
  },
  rotateAroundPoint: function(v, a) {
    var tempX = this.x - v.x;
    var tempY = this.y - v.y;
    this.x = tempX*Math.cos(a) - tempY*Math.sin(a) + v.x;
    this.y = tempX*Math.sin(a) + tempY*Math.cos(a) + v.y;
  },
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
  },
  copy: function() {
    return new vec2(this.x, this.y);
  }
}