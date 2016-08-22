//Physical object bounded by shape, which can be a polygon, (circle or ellipse [I'll do these two later]).
function object(shape, mass, initialVelocity, isStatic) {
  this.shape = shape;

  this.mass = mass;

  this.static = isStatic;

  if (initialVelocity) {
    this.velocity = initialVelocity;
  } else {
    this.velocity = new vec2(0, 0);
  }
  this.acceleration = new vec2(0, 0);
}

object.prototype = {
  centerOfMass: function() {
    return this.shape.centroid();
  },
  translate: function(v) {
    this.shape.translate(v);
  },
  update: function() {
    this.translate(this.velocity.multiply(1/FPS).add(this.acceleration.multiply(1/(FPS*FPS))));
    this.velocity.translate(this.acceleration);
    this.acceleration = new vec2(0, 0);
  },
  collisionDetection: function(obj/*debug , ctx debug*/) {  //returns the point of impact or false
    if (this.shape.type == "polygon" && obj.shape.type == "polygon") { //only polygons for now
      var tmpCmbObj = this.shape.combineEdges(obj.shape);
      tmpCmbObj.translate(tmpCmbObj.centroid().vecTo(this.centerOfMass()));

      var tmpPos = obj.centerOfMass();
      var tmpVel = obj.velocity.subtract(this.velocity);
      var tmpAcc = obj.acceleration.subtract(this.acceleration);

      var tmpMovementLine = new line(tmpPos, tmpPos.add(tmpVel.multiply(1/FPS).add(tmpAcc.multiply(1/(FPS*FPS)))));

      /*debug drawPolygon(tmpCmbObj, ctx, "#fff", false);
      drawSegment(tmpMovementLine, ctx, "#fff"); debug*/

      return tmpCmbObj.intersectionPolygonSegment(tmpMovementLine); //This is a vec4 with point of impact and the normal of the impact
    }
  }
}
