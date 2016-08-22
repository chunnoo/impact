function vec4(x, y, z, w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
}

vec4.prototype = {
  translate: function(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
  },
  rotate: function(a) { //I'll do this later
    var tempX = this.x;
    var tempY = this.y;
    this.x = tempX*Math.cos(a) - tempY*Math.sin(a);
    this.y = tempX*Math.sin(a) + tempY*Math.cos(a);
  },
  rotateAroundPoint: function(v, a) { //I'll do this later
    var tempX = this.x - v.x;
    var tempY = this.y - v.y;
    this.x = tempX*Math.cos(a) - tempY*Math.sin(a) + v.x;
    this.y = tempX*Math.sin(a) + tempY*Math.cos(a) + v.y;
  },
  scale: function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
  },
  multiply: function(s) {
    return new vec4(s*this.x, s*this.y, s*this.z, s*this.w);
  },
  add: function(v) {
    return new vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  },
  length: function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  },
  dist: function(v) {
    return Math.sqrt((v.x - this.x)*(v.x - this.x) + (v.y - this.y)*(v.y - this.y));
  },
  vecTo: function(v) {
    return new vec4(v.x - this.x, v.y - this.y, v.z - this.z, v.w - this.w);
  },
  dot: function(v) {
    return this.x*v.x + this.y*v.y + this.z*v.z + this.w*v.w;
  },
  wedge: function(v) { //I'll do this later
    return this.x*v.y - this.y*v.x;
  },
  normal: function() { //I'll do this later
    return new vec2(-this.y, this.x);
  },
  equal: function(v) {
    return Math.abs(this.x - v.x) < EPS && Math.abs(this.y - v.y) < EPS && Math.abs(this.z - v.z) < EPS && Math.abs(this.w - v.w) < EPS;
  },
  copy: function() {
    return new vec4(this.x, this.y, this.z, this.w);
  },
  sortAroundPoint: function(v) { //I haven't even done this for vec2, s yea
    return function(a, b) {}
  },
  inverse: function() {
    return new vec4(-this.x, -this.y, -this.z, -this.w);
  },
  xy: function() {
    return new vec2(this.x, this.y);
  },
  zw: function() {
    return new vec2(this.z, this.w);
  }
}
