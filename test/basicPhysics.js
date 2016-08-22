var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var frames = 0;

var mouse = new vec2(0, 0);
var deltaMouse = new vec2(0, 0);
var clicks = 0;

var objectOne = new object(genRegularPolygon(new vec2(canvas.width/4, canvas.height/4), 100, 0, 5), 1, new vec2(100, 100), false);
var objectTwo = new object(genRegularPolygon(new vec2(3*canvas.width/4, 3*canvas.height/4), 100, 0, 6), 1, new vec2(-100, -100), false);

var wallOne = new object(new polygon([new vec2(5, 5), new vec2(5, canvas.height - 5), new vec2(10, canvas.height - 5), new vec2(10, 5)]), 1, new vec2(0, 0), true);
var wallTwo = new object(new polygon([new vec2(5, canvas.height - 5), new vec2(canvas.width - 5, canvas.height - 5), new vec2(canvas.width - 5, canvas.height - 10), new vec2(5, canvas.height - 10)]), 1, new vec2(0, 0), true);
var wallThree = new object(new polygon([new vec2(canvas.width - 5, canvas.height - 5), new vec2(canvas.width - 5, 5), new vec2(canvas.width - 10, 5), new vec2(canvas.width - 10, canvas.height - 5)]), 1, new vec2(0, 0), true);
var wallFour = new object(new polygon([new vec2(canvas.width - 5, 5), new vec2(5, 5), new vec2(5, 10), new vec2(canvas.width - 5, 10)]), 1, new vec2(0, 0), true);

//wallOne.shape.reverseVertices();
//wallTwo.shape.reverseVertices();
//wallThree.shape.reverseVertices();
//wallFour.shape.reverseVertices();

function draw(e) {
  frames++;
  //var time = frames/120;

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var objArr = [objectOne, objectTwo, wallOne, wallTwo, wallThree, wallFour];

  collision(objArr);

  for (var i = 0; i < objArr.length; i++) {
    drawObject(objArr[i], ctx, "#fff", false);
    objArr[i].update();
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", function (e) {
  var newMouse = new vec2(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
  deltaMouse.x = newMouse.x - mouse.x;
  deltaMouse.y = newMouse.y - mouse.y;
  mouse.x += deltaMouse.x;
  mouse.y += deltaMouse.y;
});

canvas.addEventListener("click", function (e) {
  clicks++;
});

draw();
