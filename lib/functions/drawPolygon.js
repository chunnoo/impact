function drawPolygon(p, ctx, color, solid) {
  if (solid) {
    ctx.fillStyle = color;
  } else {
    ctx.strokeStyle = color;
  }
  ctx.beginPath();
  ctx.moveTo(p.vertex[0].x, p.vertex[0].y);
  for (var i = 1; i < p.vertex.length - 1; i++) {
    ctx.lineTo(p.vertex[i].x, p.vertex[i].y);
  }
  ctx.closePath();
  if (solid) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
