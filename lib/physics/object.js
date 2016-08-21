//Physical object bounded by shape, which can be a polygon, (circle or ellipse [I'll do these two later]).
function object(shape) {
  this.shape = shape;

  this.mass = Math.abs(this.shape.signedArea());
  this.centerOfMass = this.shape.centroid();

  this.velocity = new vec2(0, 0);
  this.acceleration = new vec2(0, 0);
}

object.prototype = {
  collisionDetection: function(obj) {  //returns the point of impact or false
    if (this.shape.type == "polygon" && obj.shape.type == "polygon") { //only polygons for now

    }
  }
}
