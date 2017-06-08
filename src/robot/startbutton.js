/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var lights = require("./lights");
var lineSensor = require("./linesensor");
var lightSensor = require("./lightsensor");
var distanceSensor = require("./distancesensor");

/* private variables */
var isDisabled, isRobotRunning;

var click = function(robot) {
  if (isDisabled) return;
  if (isRobotRunning) {
    stopRobot(robot);
  }
  else startRobot(robot);

  disableButton(2000);
}

/* exported object */
module.exports = {
  initialize: function(robot) {
    isRobotRunning = false;

    var button = new five.Pin(mbot.BUTTON);
    disableButton(2000);

    button.on("change", function() {
      click(robot);
    });
  },
  click: click
}

/* private functions */
function disableButton(miliseconds) {
  isDisabled = true;
  setTimeout(function() { isDisabled = false; }, miliseconds);
}

function startRobot(robot) {
  lineSensor.activate();
  lightSensor.activate();
  distanceSensor.activate();
  robot.activate();
  isRobotRunning = true;
  console.log("robot started");
}

function stopRobot(robot) {
  robot.stop();
  lineSensor.deactivate();
  lightSensor.deactivate();
  distanceSensor.deactivate();
  lights.turnOffLights();
  isRobotRunning = false;
  console.log("stopped robot");
}
