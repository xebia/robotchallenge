var mbot = require("../mbotlayout");
var five = require("johnny-five");
var pixel = require("node-pixel");

var lightSensor;

var lightsAreOn = false;
const lightThreshold = 97;

var lightsOnCount = 0;
function determineLightness(robot, value) {
    if (lightsAreOn && lightsOnCount > 10 && value >= lightThreshold) {
      robot.turnOffLights();
      lightsAreOn = false;
    } else if (!lightsAreOn && value < lightThreshold) {
      robot.turnOnLights();
      lightsAreOn = true;
      lightsOnCount = 0;
    }
    lightsOnCount++;
}

function listenForLightChange(robot) {
  setTimeout(() => {
    lightSensor.scale(0,100).on("data", function() {
      determineLightness(robot, this.value);
    });
  }, 2000);
}

function initialize(robot) {
  lightSensor = new five.Sensor(mbot.LIGHT_SENSOR);
  listenForLightChange(robot);
}

module.exports = {
  initialize, 
  determineLightness, 
  listenForLightChange
};

