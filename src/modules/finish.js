var mbot = require("../mbotlayout");
var five = require("johnny-five");

var proximitySensor;

function determineIfFinishReached(robot, distance) {
  if (distance < 10 && robot.isActive) {
    robot.stop();
  }
}

function listenForFinish(robot) {
  setTimeout(() => {
    proximitySensor.on("change", function() {
      determineIfFinishReached(robot, this.cm);
    });
  }, 2000);
}

function initialize(robot) {
  proximitySensor = new five.Proximity(mbot.PROXIMITY_SENSOR);
  listenForFinish(robot);
}

module.exports = {
  initialize,
  determineIfFinishReached
};
