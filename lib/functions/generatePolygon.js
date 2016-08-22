function genRegularPolygon(center, size, rotation, numSides) {
  var tempPointArray = [];

  for (var i = 0; i < numSides; i++) {
    tempPointArray.push(new vec2(center.x + Math.cos(rotation + i*Math.PI*2/numSides)*size, center.y + Math.sin(rotation + i*Math.PI*2/numSides)*size));
  }

  return new polygon(tempPointArray);
}
