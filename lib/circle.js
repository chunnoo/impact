//circle on form (x-c.x)*(x-c.x) + (y-c.y)*(y-c.y) - r*r = 0
function circle(centerPoint, radius) {
  this.c = centerPoint;
  this.r = radius;
}

circle.prototype = {
  translate: function(v) {
    this.c.translate();
  },
  rotate: function(a) {
    this.c.rotateAroundPoint(new vec2(0, 0), a);
  },
  rotateAroundPoint: function(v, a) {
    this.c.rotateAroundPoint(v, a);
  },
  equal: function(c) {
    return this.c.ecual(c.c) && Math.abs(this.r - c.r) < EPS
  },
  intersectionCircleLine: function(l) {
    
  }
}

//I'll work on this later, I'm focusing on just polygons for now.