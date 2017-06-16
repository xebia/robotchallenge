var mbot = require("../mbotlayout");
var five = require("johnny-five");

var DEFAULT_CORNER_SHARPNESS = 0.2;
var SEARCH_LINE_MAX_TRIES = 25; // Each try is 0.05 seconds.

var robot;
var leftLineSensor, rightLineSensor;
var sensingLineOnLeft = true;
var sensingLineOnRight = true;
var lastCornerRight = true;

function adjustRight(sharpness) {
  lastCornerRight = true;
  robot.goRight(sharpness);
}

function adjustLeft(sharpness) {
  lastCornerRight = false;
  robot.goLeft(sharpness);
}

function inSharpCorner() {
  return !(sensingLineOnRight || sensingLineOnLeft);
}

function _tryBothDirections(firstDirection, secondDirection, tries, sharpness) {
  if (tries < SEARCH_LINE_MAX_TRIES) {
    firstDirection(sharpness);
    setTimeout(() => {
      if (inSharpCorner()) {
        var increasedSharpness = (sharpness < 0.95) ? sharpness + 0.05 : 1.0;
        _tryBothDirections(firstDirection, secondDirection, tries+1, increasedSharpness);
      }
    }, 50);
  } else {
    secondDirection(sharpness);
  }
}

function tryBothDirections(firstDirection, secondDirection) {
  _tryBothDirections(firstDirection, secondDirection, 0, DEFAULT_CORNER_SHARPNESS);
}

function searchLine() {
  if (lastCornerRight) {
    tryBothDirections(adjustRight, adjustLeft);
  } else {
    tryBothDirections(adjustLeft, adjustRight);
  }
}

function changeDirection() {
  if (sensingLineOnRight && sensingLineOnLeft) {
    robot.goForward();
  } else if (sensingLineOnRight) {
    adjustRight(DEFAULT_CORNER_SHARPNESS);
  } else if (sensingLineOnLeft) {
    adjustLeft(DEFAULT_CORNER_SHARPNESS);
  } else {
    searchLine();
  }
}

function rightSensorChange(value) {
  sensingLineOnRight = (value === 0);
}

function leftSensorChange(value) {
  sensingLineOnLeft = (value === 0);
}

function listenForLineSensorChanges() {
  setTimeout(() => {
    rightLineSensor.on("change", function() {
      rightSensorChange(this.value);
      changeDirection();
    });
    leftLineSensor.on("change", function() {
      leftSensorChange(this.value);
      changeDirection();
    });
  },2000);
}

function setRobot(x) {
  robot = x;
}

function initialize(robot) {
  leftLineSensor = new five.Sensor.Digital(mbot.LEFT_LINE_SENSOR);
  rightLineSensor = new five.Sensor.Digital(mbot.RIGHT_LINE_SENSOR);
  setRobot(robot);
  listenForLineSensorChanges();
}

module.exports = {
  initialize,
  setRobot,
  rightSensorChange,
  leftSensorChange,
  changeDirection,
  inSharpCorner
};
