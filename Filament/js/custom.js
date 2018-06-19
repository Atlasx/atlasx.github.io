let sections = ["#p0", "#p1", "#p2", "#p3", "#p4", "#p5", "#p6", "#p7", "#p8"];
let sectionStarCount = [0, 0, 50, 0, 125, 0, 250, 0, 0];
let sectionStarSpeed = [0, 0, 3, 0, 1, 0, .1, 0, 0];
var activeIndex = 0;
var sectionCount = 9;
var starCount = 50;
let bulbs = ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6"];
let doubleBulbs = ["#4b1", "#4b2", "#4b3", "#4b4", "#4b5", "#4b6", "#4b1b", "#4b2b", "#4b3b", "#4b4b", "#4b5b", "#4b6b"];
var bulbIndex = 0;
var secondBulbIndex = 20;
var allBulbs = [];
let bulbTopPos = [-10, 350, 700];
let bulbAltTopPos = [50, 400, 750];

$(document).ready(function() {
  for (var i = 0; i < sectionCount; i++) {
    $(sections[i]).hide();
  }
  activeIndex = 0;
  $(sections[activeIndex]).show();
  setInterval(tubeSim, 500);
  setInterval(doubleTubeSim, 100);
})

function next() {
  $(sections[activeIndex]).fadeOut(500, function () {
    if (activeIndex == 7) {
      unloadBulbs();
    }
    activeIndex++;
    activeIndex = activeIndex % sectionCount;
    if (activeIndex == 2 || activeIndex == 4 || activeIndex == 6) { //Night
      addStars();
      $(".feature-text").addClass("feature-text-shadow");
      $("body").addClass("body-night");
    } else {
      removeStars();
      $(".feature-text").removeClass("feature-text-shadow");
      $("body").removeClass("body-night");
    }
    if (activeIndex == 7) {
      loadBulbs();
    }
    $(sections[activeIndex]).fadeIn(500);
  });
}

function prev() {
  $(sections[activeIndex]).fadeOut(500, function () {
    if (activeIndex == 7) {
      unloadBulbs();
    }
    activeIndex--;
    activeIndex = (activeIndex + sectionCount) % sectionCount;
    if (activeIndex == 2 || activeIndex == 4 || activeIndex == 6) { //Night
      addStars();
      $(".feature-text").addClass("feature-text-shadow");
      $("body").addClass("body-night");
    } else {
      removeStars();
      $(".feature-text").removeClass("feature-text-shadow");
      $("body").removeClass("body-night");
    }
    if (activeIndex == 7) {
      loadBulbs();
    }
    $(sections[activeIndex]).fadeIn(500);
  });
}

function addStars() {
  var stars = sectionStarCount[activeIndex];
  var bounce = activeIndex == 6 ? "jerk" : "bounce";
  for (var i = 0; i < stars; i++) {
    $("body").append("<img src='./images/dot.svg' class='" + bounce + "'/>");
  }
  $(".bounce, .jerk").each(function() {

    var dim = 38;
    var tempRand = 1-Math.random();
    dim = dim * tempRand * tempRand * tempRand * tempRand * 4 + 10;
    var duration = (dim / 10) + sectionStarSpeed[activeIndex];
    if (duration > 20) {
      duration = 20 + Math.random() * 3;
    }
    duration /= activeIndex  * 2;

    $(this).css("width", dim + "px");
    $(this).css("top", getRandomInt(window.outerHeight + 100) - 100);
    $(this).css("left", getRandomInt(window.outerWidth + 100) - 100);
    $(this).css("animation-duration", duration + "s");
  });
}

function removeStars() {
  $(".bounce").remove();
  $(".jerk").remove();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//will be called every second, randomly switch on and off the tube lights
function tubeSim() {
  if (activeIndex != 1) {return;}
  for (var i = 0; i < 3; i++) { //Left
    Math.random() > 0.5 ? $(bulbs[i]).attr("src", "./images/threeoldlightbulbs.png") : $(bulbs[i]).attr("src", "./images/threeoldlightbulbsLight.png");
  }
  for (var i = 3; i < bulbs.length; i++) { //Right
    Math.random() > 0.5 ? $(bulbs[i]).attr("src", "./images/threeoldlightbulbsflip.png") : $(bulbs[i]).attr("src", "./images/threeoldlightbulbsflipLight.png");
  }
}

function doubleTubeSim() {
  if (activeIndex != 7) {return;}
  $(allBulbs[bulbIndex]).attr("src", "./images/threeoldlightbulbs.png");
  bulbIndex = ++bulbIndex % allBulbs.length;
  $(allBulbs[bulbIndex]).attr("src", "./images/threeoldlightbulbsLight.png");
  $(allBulbs[secondBulbIndex]).attr("src", "./images/threeoldlightbulbs.png");
  secondBulbIndex = ++secondBulbIndex % allBulbs.length;
  $(allBulbs[secondBulbIndex]).attr("src", "./images/threeoldlightbulbsLight.png");
}

function loadBulbs() {
  var rowElem = $("#p7");
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 3; j++) {
      if (i % 2) {
        rowElem.append("<img src='./images/threeoldlightbulbs.png' class='bulbs' id='bulb" + (i * 3 + j) + "' style='top:"+bulbTopPos[j]+"px;left:"+(i*120-120)+"px;'/>");
      } else {
        rowElem.append("<img src='./images/threeoldlightbulbs.png' class='bulbs-muted' id='bulb" + (i * 3 + j) + "' style='top:"+bulbAltTopPos[j]+"px;left:"+(i*120-120)+"px;''/>");
      }
      allBulbs.push("#bulb" + (i * 3 + j));
    }
  }
}

function unloadBulbs() {
  $(".bulbs", ".bulbs-muted").remove();
  allBulbs = [];
}
