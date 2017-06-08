/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");

/* private variables */
var isActive, l_line, r_line, accelerateRotation;
const tolerance = 2;

var sensorChange = function(pos,value, robot) {
  if (!isActive) return;
  if (value !== 0 && value !== 1) throw new Error("no correct value found");
  if (pos !== 'right' && pos !== 'left') throw new Error("direction must be left or right");

  switch(pos) {
    case "right":
      if (value == 0) r_line = true;
      else r_line = false;
      break;
    case "left":
      if (value == 0) l_line = true;
      else l_line = false;
      break;
  }

  if ((l_line || r_line) && accelerateRotation) {
    clearInterval(accelerateRotation);
  }
  if (!l_line && r_line) {
    adjust("right", robot);
  } else if (!r_line && l_line) {
    adjust("left", robot);
  } else if (r_line && l_line) {
    continueStraight(robot);
  }
}

/* exported object */
module.exports = {
  initialize: function(robot) {
    isActive = false;
    l_line = true;
    r_line = true;

    var l_sensor = new five.Sensor.Digital(mbot.LEFT_LINE_SENSOR);
    var r_sensor = new five.Sensor.Digital(mbot.RIGHT_LINE_SENSOR);

    r_sensor.on("change", function() {
      sensorChange("right",this.value, robot);
    });

    l_sensor.on("change", function() {
      sensorChange("left",this.value, robot);
    });
  },
  activate: function() {
    isActive = true;
  },
  deactivate: function() {
    if (accelerateRotation) {
      clearInterval(accelerateRotation);
    }
    isActive = false;
  },
  sensorChange: sensorChange
}

/* private functions */
var adjust = function(direction, robot) {
  var turnWheelFactor = 0.75;
  var iteration = 0;
  var oppositeDirection = (direction == "left")? "right" : "left";
  var robot = robot;

  lookForLine(direction,turnWheelFactor, robot);

  accelerateRotation = setInterval(function() {
    if (turnWheelFactor > -1) {
      turnWheelFactor-= 0.25;
    }

    iteration++;
    if (iteration <= 12) {
      lookForLine(direction,turnWheelFactor, robot);
    } else {
      lookForLine(oppositeDirection,turnWheelFactor, robot);
    }
  },100)
}

var lookForLine = function(direction,turnWheelFactor, robot) { 
  switch(direction) {
    case "right":
      robot.move(1,turnWheelFactor);
      break;
    case "left":
      robot.move(turnWheelFactor,1);
      break;
  }
}

function continueStraight(robot) {
  robot.move(1,1);
}
