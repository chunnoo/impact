var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var frames = 0;

var mouse = new vec2(0, 0);
var deltaMouse = new vec2(0, 0);
var clicks = 0;

function genRegularPolygon(center, size, rotation, numSides) {
  var tempPointArray = [];

  for (var i = 0; i < numSides; i++) {
    tempPointArray.push(new vec2(center.x + Math.cos(rotation + i*Math.PI*2/numSides)*size, center.y + Math.sin(rotation + i*Math.PI*2/numSides)*size));
  }

  return new polygon(tempPointArray);
}

var polygonOne = genRegularPolygon(new vec2(canvas.width/2, canvas.height/2), 100, 0, 5);
var polygonTwo = genRegularPolygon(new vec2(mouse.x, mouse.y), 100, 0, 6);
var combinedPolygon = polygonOne.combineEdges(polygonTwo);
combinedPolygon.translate(combinedPolygon.centroid().vecTo(polygonOne.centroid()));

function draw(e) {
  frames++;
  //var time = frames/120;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  polygonOne.rotateAroundPoint(new vec2(canvas.width/2, canvas.height/2), 0.01);
  polygonTwo.rotateAroundPoint(mouse, -0.01);

  var combinedPolygon = polygonOne.combineEdges(polygonTwo);
  combinedPolygon.translate(combinedPolygon.centroid().vecTo(polygonOne.centroid()));

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(polygonOne.vertex[0].x, polygonOne.vertex[0].y);
  for (var i = 1; i < polygonOne.vertex.length - 1; i++) {
    ctx.lineTo(polygonOne.vertex[i].x, polygonOne.vertex[i].y);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(polygonTwo.vertex[0].x, polygonTwo.vertex[0].y);
  for (var i = 1; i < polygonTwo.vertex.length - 1; i++) {
    ctx.lineTo(polygonTwo.vertex[i].x, polygonTwo.vertex[i].y);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(combinedPolygon.vertex[0].x, combinedPolygon.vertex[0].y);
  for (var i = 1; i < combinedPolygon.vertex.length - 1; i++) {
    ctx.lineTo(combinedPolygon.vertex[i].x, combinedPolygon.vertex[i].y);
  }
  ctx.closePath();
  ctx.stroke();

  if (polygonOne.pointInside(mouse)) {
    ctx.fillStyle = "#0f0";
  } else {
    ctx.fillStyle = "#f00";
  }
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI*2);
  ctx.fill();

  var ppIntersection = polygonOne.intersectionsPolygonPolygon(polygonTwo);
  for (var i = 0; i < ppIntersection.length; i++) {
    ctx.fillStyle = "#00f"
    ctx.beginPath();
    ctx.arc(ppIntersection[i].x, ppIntersection[i].y, 5, 0, Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", function (e) {
  var newMouse = new vec2(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
  deltaMouse.x = newMouse.x - mouse.x;
  deltaMouse.y = newMouse.y - mouse.y;
  mouse.x += deltaMouse.x;
  mouse.y += deltaMouse.y;

  polygonTwo.translate(deltaMouse);
});

canvas.addEventListener("click", function (e) {
  clicks++;
});

draw();
