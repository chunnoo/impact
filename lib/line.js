//Line on the form ax + by + c = 0
function line(p, q) {
  this.p = p;
  this.q = q;
  
  if (Math.abs(this.p.x - this.q.x) < EPS) { //Line is vertical
    this.a = 1;
    this.b = 0;
    this.c = -this.p.x;
  } else { //Line is not vertical
    this.a = -(this.p.y - this.q.y)/(this.p.x - this.q.x);
    this.b = 1;
    this.c = -(this.a * this.p.x) - this.p.y;
  }
}

line.prototype = {
  equal: function(l) {
    return Math.abs(this.a - l.a) < EPS && Math.abs(this.b - l.b) < EPS && Math.abs(this.c - l.c) < EPS;
  },
  parallel: function(l) {
    return Math.abs(this.a - l.a) < EPS && Math.abs(this.b - l.b) < EPS;
  },
  intersectionPoint: function(l) {
    if (this.parallel) {
      return false;
    } else {
      var x = (this.b * l.c - this.c * l.b)/(this.a * l.b - this.b * l.a);
      
      if (Math.abs(this.b) < EPS) {
        var y = -(l.a * x + l.c)/l.b;
      } else {
        var y = -(this.a * x + this.c)/this.b;
      }
      
      return new vec2(x, y);
    }
  },
  intersectionSegmentSegment: function(l) {
    var p = this.intersectionPoint(l);
    
    if (p) {
    
      if (p.x < Math.max(this.p.x, this.q.x) && p.x > Math.min(this.p.x, this.q.x) && p.y < Math.max(this.p.y, this.q.y) && p.y > Math.min(this.p.y, this.q.y) && p.x < Math.max(l.p.x, l.q.x) && p.x > Math.min(l.p.x, l.q.x) && p.y < Math.max(l.p.y, l.q.y) && p.y > Math.min(l.p.y, l.q.y)) {
        return p;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  intersectionRaySegment: function(l) {
    var p = this.intersectionPoint(l);
    
    if (p) {
    
      if (this.p.vecTo(p).dot(this.p.vecTo(this.q)) >= 0 && p.x < Math.max(l.p.x, l.q.x) && p.x > Math.min(l.p.x, l.q.x) && p.y < Math.max(l.p.y, l.q.y) && p.y > Math.min(l.p.y, l.q.y)) {
        return p;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}





















