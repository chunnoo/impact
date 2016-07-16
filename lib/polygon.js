function polygon(p) { //p is an array of the vertices of the polygon
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
  copy: function() {
    var tempPontArray = [];
    for (var i = 0; i < this.vertex.length - 1; i++) {
      tempPontArray.push(this.vertex[i].copy());
    }
    return new polygon(tempPontArray);
  }
}

//if you know that the polygon is convex, you might be able to binarysearch in the pointInside function
























