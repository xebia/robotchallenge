/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var lights = require("./lights");
var lineSensor = require("./linesensor");
var lightSensor = require("./lightsensor");

/* private variables */
var isActive;
const closeRange = 2;

var sensorChange = function(value, robot) {
  if (!isActive) return;

  if (value < closeRange) {
    lineSensor.deactivate();
    lightSensor.deactivate();
    robot.stop();
    isActive = false;
    lights.celebrate();
  }
}

/* exported objects */
module.exports = {
  initialize: function(robot) {
    isActive = false;

    var distance_sensor = new five.Proximity(mbot.PROXIMITY_SENSOR);

    distance_sensor.on("change", function() {
      sensorChange(this["inches"], robot);
    });
  },
  activate: function() {
    isActive = true;
  },
  deactivate: function() {
    isActive = false;
  },
  sensorChange: sensorChange
}
