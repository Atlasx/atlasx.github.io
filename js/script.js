var canvas = document.getElementById("mySimulation");
var ctx = canvas.getContext("2d");

var GameState = {
  STOPPED : "STOPPED",
  RUNNING : "RUNNING"
};

var pauseImg = document.getElementById('pauseImage');
var playImg = document.getElementById('playImage');

var currentGameState = GameState.RUNNING;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var DEG_TO_RADIANS = Math.PI/180;
var RAD_TO_DEGREES = 57.2958;

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
  this.rotation = Math.atan2(this.heading.y, this.heading.x)+Math.PI/2;

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
  createRandomBird(i*50,i*50+200);
}

function createRandomBird (x, y) {
  var bird = new Bird(x, y);
  bird.rotation = 0;
  if ((Math.random()*2-1) > 0) {
    bird.color = "#ef2864";
  } else {
    bird.color = "#56d2ff";
  }
  var heading = new Vector2();
  heading.x = Math.random()*2-1;
  heading.y = Math.random()*2-1;
  bird.ChangeHeading(heading);
  birds.push(bird);
}

function update () {
  //Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw birds
  drawBirds();
  //draw ui
  drawStatusButton();

  if (currentGameState == GameState.STOPPED) {return;}

  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    b.update();
  }
}

function drawStatusButton () {
  if (currentGameState == GameState.RUNNING) {
    ctx.drawImage(pauseImg, 10, 10);
  } else {
    ctx.drawImage(playImg, 10, 10)
  }
}

function drawBirds () {

  //Draw birds
  for (var i = 0; i < birds.length; i++) {
    var b = birds[i];
    b.draw();
  }
}

function isInsideRect (mousePos, rect) {
  return mousePos.x > rect.x && mousePos.x < rect.x + rect.width && mousePos.y < rect.y + rect.height && mousePos.y > rect.y;
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

var pauseRect = {x: 10, y: 10, width: pauseImage.width, height: pauseImage.height};

canvas.addEventListener ('click', function (event) {
  var mousePos = getMousePos(canvas, event);

  //Pause/Play button
  if (isInsideRect(mousePos, pauseRect)) {
    if (currentGameState == GameState.RUNNING) {
      currentGameState = GameState.STOPPED;
    } else if (currentGameState == GameState.STOPPED) {
      currentGameState = GameState.RUNNING;
    }
    return;
  }

  //spawn bird
  createRandomBird(mousePos.x, mousePos.y);


}, false);

setInterval(update, 10);
