var pieces = [];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameStarted = false;
var interval;
var startx, starty, endx, endy, xcomp, ycomp;

canvas.addEventListener("mousedown", e => {
  startx = e.offsetX;
  starty = e.offsetY;
});

canvas.addEventListener("mouseup", e => {
  endx = e.offsetX;
  endy = e.offsetY;
  launch();
});

function setUpGame() {
  if (!gameStarted) {
    pieces.push(new component(240, 260, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(250, 245, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(260, 250, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(260, 230, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(240, 230, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(240, 220, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(220, 230, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(230, 245, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(220, 250, "#DFC5A2", 5, "tan", 0, 0));
    pieces.push(new component(230, 255, "#000000", 5, "black", 0, 0));
    pieces.push(new component(240, 250, "#000000", 5, "black", 0, 0));
    pieces.push(new component(250, 255, "#000000", 5, "black", 0, 0));
    pieces.push(new component(260, 240, "#000000", 5, "black", 0, 0));
    pieces.push(new component(250, 235, "#000000", 5, "black", 0, 0));
    pieces.push(new component(250, 225, "#000000", 5, "black", 0, 0));
    pieces.push(new component(230, 225, "#000000", 5, "black", 0, 0));
    pieces.push(new component(230, 235, "#000000", 5, "black", 0, 0));
    pieces.push(new component(220, 240, "#000000", 5, "black", 0, 0));
    pieces.push(new component(240, 240, "#DA3939", 5, "red", 0, 0));
    pieces.push(new component(240, 360, "#9B679F", 5, "player", 0, 0));
  }

  gameStarted = true;
  draw();
}

function drawPieces() {
  for (var i = 0; i < pieces.length; i++) {
    ctx.beginPath();
    ctx.arc(pieces[i].x, pieces[i].y, pieces[i].radius, 0, Math.PI * 2);
    ctx.fillStyle = pieces[i].color;
    ctx.fill();
    ctx.closePath();
  }

  checkCollisions();
  setPos();
}

function checkCollisions() {
  for (var i = 0; i < pieces.length; i++) {
    for (var o = 0; o < pieces.length; o++) {
      if (i != o) {
        if (
          Math.sqrt(
            Math.pow(
              pieces[o].x + pieces[o].dx - pieces[i].x + pieces[i].dx,
              2
            ) +
              Math.pow(
                pieces[o].y + pieces[o].dy - pieces[i].y + pieces[i].dy,
                2
              ) <
              10
          )
        ) {
          changeVelocities(i, o);
        }
      }
    }
  }
}

function changeVelocities(piece1, piece2) {
  pieces[piece1].dx += 1;
  pieces[piece1].dy += 1;
  pieces[piece2].dx += 1;
  pieces[piece2].dy += 1;
}

function setPos() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].x = pieces[i].x + pieces[i].dx;
    pieces[i].y = pieces[i].y + pieces[i].dy;
  }
}

function launch() {
  xcomp = endx - startx;
  ycomp = endy - starty;
  pieces[19].dx = (xcomp / (Math.abs(xcomp) + Math.abs(ycomp))) * 5;
  pieces[19].dy = (ycomp / (Math.abs(xcomp) + Math.abs(ycomp))) * 5;
}

function component(x, y, color, radius, team, dx, dy) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.team = team;
  this.dx = dx;
  this.dy = dy;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPieces();

  clearInterval(interval); // clear timer if any
  interval = setInterval(draw, 50);
}
