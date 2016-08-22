function drawSegment(l, ctx, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(l.p.x, l.p.y);
  ctx.lineTo(l.q.x, l.q.y);
  ctx.stroke();
}
