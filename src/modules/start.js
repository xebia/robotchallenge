var mbot = require("../mbotlayout");
var five = require("johnny-five");

var startButton;

function activateAndMoveForward(robot) {
  robot.activate();
  robot.goForward();
}

function listenForStartButtonPress(robot) {
  setTimeout(() => {
    startButton.on("change", function() {
      activateAndMoveForward(robot);
    });
  }, 2);
}

function initialize(robot) {
  startButton = new five.Pin(mbot.BUTTON);
  listenForStartButtonPress(robot);
}

module.exports = {
  initialize,
  activateAndMoveForward
};
