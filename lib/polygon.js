function polygon(p) { //p is an array of the vertices of the polygon

  this.type = "polygon";

  this.vertex = p;
  this.vertex.push(this.vertex[0].copy());

  this.edge = [];
  for (var i = 0; i < this.vertex.length - 1; i++) {
    this.edge.push(new line(this.vertex[i].copy(), this.vertex[i + 1].copy()));
  }
}

polygon.prototype = {
  translate: function(v) {
    for (var i = 0; i < this.vertex.length; i++) {
      this.vertex[i].translate(v);
    }
    for (var i = 0; i < this.edge.length; i++) {
      this.edge[i].translate(v);
    }
  },
  rotate: function(a) {
    for (var i = 0; i < this.vertex.length; i++) {
      this.vertex[i].rotate(a);
    }
    for (var i = 0; i < this.edge.length; i++) {
      this.edge[i].rotate(a);
    }
  },
  rotateAroundPoint: function(v, a) {
    for (var i = 0; i < this.vertex.length; i++) {
      this.vertex[i].rotateAroundPoint(v, a);
    }
    for (var i = 0; i < this.edge.length; i++) {
      this.edge[i].rotateAroundPoint(v, a);
    }
  },
  pointInside: function(p) {
    var tempRay = new line(p, new vec2(p.x + 1, p.y + 0));

    var edgesCrossed = 0;
    for (var i = 0; i < this.edge.length; i++) {
      if (tempRay.intersectionRaySegmentTest(this.edge[i])) {
        edgesCrossed++;
      }
    }

    return edgesCrossed % 2 == 1;
  },
  intersectionsPolygonPolygon: function(p) {
    var intersectionPointsArray = [];

    for (var i = 0; i < this.edge.length; i++) {
      for (var j = 0; j < p.edge.length; j++) {
        var tempIntersectionPoint = this.edge[i].intersectionSegmentSegment(p.edge[j]);
        if (tempIntersectionPoint) {
          intersectionPointsArray.push(tempIntersectionPoint);
        }
      }
    }

    return intersectionPointsArray;
  },
  intersectionPolygonSegment: function(l) { //This returns a vec4 with point of impact and the normal of the impact
    var closestIntersectionPoint = false;
    var impactNormal = false;

    for (var i = 0; i < this.edge.length; i++) {
      var tmpIntersectionPoint = this.edge[i].intersectionSegmentSegment(l);
      if (tmpIntersectionPoint) {
        if (!closestIntersectionPoint) {
          closestIntersectionPoint = tmpIntersectionPoint.copy();
          impactNormal = this.edge[i].normal();
        } else if (l.p.vecTo(tmpIntersectionPoint).length() < l.p.vecTo(closestIntersectionPoint).length()) {
          closestIntersectionPoint = tmpIntersectionPoint.copy();
          impactNormal = this.edge[i].normal();
        }
      }
    }

    if (!closestIntersectionPoint) {
      return false;
    } else {
      return new vec4(closestIntersectionPoint.x, closestIntersectionPoint.y, impactNormal.x, impactNormal.y);
    }
  },
  copy: function() {
    var tempPontArray = [];
    for (var i = 0; i < this.vertex.length - 1; i++) {
      tempPontArray.push(this.vertex[i].copy());
    }
    return new polygon(tempPontArray);
  },
  signedArea: function() {
    var a = 0;
    for (var i = 0; i < this.vertex.length - 1; i++) {
      a += this.vertex[i].x*this.vertex[i + 1].y - this.vertex[i + 1].x*this.vertex[i].y;
    }
    return a/2;
  },
  centroid: function() {
    var v = new vec2(0, 0);
    var a = this.signedArea();

    for (var i = 0; i < this.vertex.length - 1; i++) {
      v.x += (this.vertex[i].x + this.vertex[i + 1].x)*(this.vertex[i].x*this.vertex[i + 1].y - this.vertex[i + 1].x*this.vertex[i].y);
      v.y += (this.vertex[i].y + this.vertex[i + 1].y)*(this.vertex[i].x*this.vertex[i + 1].y - this.vertex[i + 1].x*this.vertex[i].y);
    }
    v.x /= 6*a;
    v.y /= 6*a;
    return v;
  },
  combineEdges: function(obj) {  //returns a new polygon with the combined edges of these two
    var tmpEdgeVectorArray = [];
    for (var i = 0; i < this.edge.length; i++) {
      tmpEdgeVectorArray.push(this.edge[i].vector());
    }
    for (var i = 0; i < obj.edge.length; i++) {
      tmpEdgeVectorArray.push(obj.edge[i].vector());
    }
    tmpEdgeVectorArray.sort(function(a, b) {
      return Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x);
    });
    var tmpPointArray = [];
    var tmpCurrentPoint = new vec2(0, 0);
    for (var i = 0; i < tmpEdgeVectorArray.length; i++) {
      tmpPointArray.push(tmpCurrentPoint.copy());
      tmpCurrentPoint.translate(tmpEdgeVectorArray[i]);
    }
    return new polygon(tmpPointArray);
  },
  reverseVertices: function() {
    var newVertices = [];
    for (var i = this.vertex.length - 1; i >= 0; i--) {
      newVertices.push(this.vertex[i].copy());
    }
    this.vertex = newVertices;

    this.edge = [];
    for (var i = 0; i < this.vertex.length - 1; i++) {
      this.edge.push(new line(this.vertex[i].copy(), this.vertex[i + 1].copy()));
    }
  }
}

//if you know that the polygon is convex, you might be able to binarysearch in the pointInside function

//scaling should be a thing
