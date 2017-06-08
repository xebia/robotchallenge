/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var followLine = require("./followline");
var automatedLight = require("./automatedlight");
var finish = require("./finish");

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
  followLine.activate();
  automatedLight.activate();
  finish.activate();
  robot.activate();
  isRobotRunning = true;
  console.log("robot started");
}

function stopRobot(robot) {
  robot.stop();
  followLine.deactivate();
  automatedLight.deactivate();
  finish.deactivate();
  robot.turnOffLights();
  isRobotRunning = false;
  console.log("stopped robot");
}
