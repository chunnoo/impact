//Line on the form ax + by + c = 0
function line(startPoint, endPoint) {
  this.p = startPoint;
  this.q = endPoint;

  this.a = 0;
  this.b = 0;
  this.c = 0;

  this.calculateEquation = function () {
    if (Math.abs(this.p.x - this.q.x) < EPS) { //Line is vertical
      this.a = 1;
      this.b = 0;
      this.c = -this.p.x;
    } else { //Line is not vertical
      this.a = -(this.p.y - this.q.y)/(this.p.x - this.q.x);
      this.b = 1;
      this.c = -(this.a * this.p.x) - this.p.y;
    }
  };

  this.calculateEquation();
}

line.prototype = {
  translate: function(v) { //new line a(x - x) + b(y - y) + c = 0
    this.p.translate(v);
    this.q.translate(v);

    this.c -= this.a*v.x + this.b*v.y;
  },
  rotate: function(a) {
    this.p.rotate(a);
    this.q.rotate(a);

    this.calculateEquation();
    //var tempA = this.a;
    //var tempB = this.b;
    //this.a = tempA*Math.cos(a) + tempB*Math.sin(a);
    //this.b = -tempA*Math.sin(a) + tempB*Math.cos(a);
  },
  rotateAroundPoint: function(v, a) {
    this.p.rotateAroundPoint(v, a);
    this.q.rotateAroundPoint(v, a);

    this.calculateEquation();
  },
  equal: function(l) {
    return Math.abs(this.a - l.a) < EPS && Math.abs(this.b - l.b) < EPS && Math.abs(this.c - l.c) < EPS;
  },
  parallel: function(l) {
    return Math.abs(this.a - l.a) < EPS && Math.abs(this.b - l.b) < EPS;
  },
  intersectionPoint: function(l) {
    if (this.parallel(l)) {
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

      if (p.x < Math.max(this.p.x, this.q.x) + EPS && p.x > Math.min(this.p.x, this.q.x) - EPS && p.y < Math.max(this.p.y, this.q.y) + EPS && p.y > Math.min(this.p.y, this.q.y) - EPS && p.x < Math.max(l.p.x, l.q.x) + EPS && p.x > Math.min(l.p.x, l.q.x) - EPS && p.y < Math.max(l.p.y, l.q.y) + EPS && p.y > Math.min(l.p.y, l.q.y) - EPS) {
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

      if (this.p.vecTo(p).dot(this.p.vecTo(this.q)) >= 0 && p.x < Math.max(l.p.x, l.q.x) + EPS && p.x > Math.min(l.p.x, l.q.x) - EPS && p.y < Math.max(l.p.y, l.q.y) + EPS && p.y > Math.min(l.p.y, l.q.y) - EPS) {
        return p;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  intersectionRaySegmentTest: function(l) {
    var p = this.intersectionPoint(l);

    if (p) {

      if (this.p.vecTo(p).dot(this.p.vecTo(this.q)) >= 0 && p.x < Math.max(l.p.x, l.q.x) + EPS && p.x > Math.min(l.p.x, l.q.x) - EPS && p.y < Math.max(l.p.y, l.q.y) + EPS && p.y > Math.min(l.p.y, l.q.y) - EPS) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  copy: function() {
    return new line(this.p, this.q);
  },
  vector: function() {
    return new vec2(this.q.x - this.p.x, this.q.y - this.p.y);
  }
}
