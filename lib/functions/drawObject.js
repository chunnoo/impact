function drawObject(obj, ctx, color, solid) {
  if (obj.shape.type == "polygon") {
    drawPolygon(obj.shape, ctx, color, solid);
  }
}
