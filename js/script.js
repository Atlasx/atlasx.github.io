var canvas = document.getElementById("mySimulation");
var ctx = canvas.getContext("2d");

var GameState = {
  STOPPED : "STOPPED",
  RUNNING : "RUNNING"
};

var currentGameState = GameState.RUNNING;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var DEG_TO_RADIANS = Math.PI/180;

var x = canvas.width/2;
var y = canvas.height/2;
var dx = 0;
var dy = 0;

var Vector2 = function() {
  this.x = 0;
  this.y = 0;
  this.GetMagnitude = function () {return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y,2));};
};

Vector2.prototype.Add = function(other) {
  this.x += other.x;
  this.y += other.y;
};

Vector2.prototype.Normalize = function() {
  var mag = this.GetMagnitude();
  this.x = x/mag;
  this.y = y/mag;
};

var Bird = function(x, y) {
  console.log("Bird Created");
  this.color = "#56d2ff";
  this.position = new Vector2();
  this.position.x = x;
  this.position.y = y;
  this.heading = new Vector2();
  this.rotation = 0;
};

Bird.prototype.ChangeHeading = function(newHeading) {
  this.heading = newHeading;
};

Bird.prototype.update = function() {
  this.position.Add(this.heading);
};

Bird.prototype.draw = function() {
  ctx.save();
  //Move to location
  ctx.translate(this.position.x, this.position.y);
  //Rotate to rotation
  ctx.rotate(this.rotation);
  //Draw bird shape
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(15, 40);
  ctx.lineTo(0, 35);
  ctx.lineTo(-15, 40);
  ctx.lineTo(0, 0);
  //Fill with bird color
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.stroke();
  //Restore coordinate system
  ctx.restore();
};

var birds = [];

for (var i = 0; i < 10; i++) {
  var bird = new Bird(30*i,30*i+200);
  bird.rotation = 90 * DEG_TO_RADIANS;
  if (i % 2 == 0) {
    bird.color = "#ef2864";
  } else {
    bird.color = "#56d2ff";
  }
  var heading = new Vector2();
  heading.x = 1;
  bird.ChangeHeading(heading);
  birds.push(bird);
}

function update () {
  if (currentGameState == GameState.STOPPED) {return;}

  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    b.update();
  }

  //Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBirds();
}

function drawBirds () {

  //Draw birds
  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    b.draw();
  }
}

setInterval(update, 10);
