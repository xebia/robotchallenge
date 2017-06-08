/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var wheels = require("./wheels");
var lights = require("./lights");
var lineSensor = require("./linesensor");
var lightSensor = require("./lightsensor");

/* private variables */
var isActive;
const closeRange = 2;

var sensorChange = function(value) {
  if (!isActive) return;

  if (value < closeRange) {
    lineSensor.deactivate();
    lightSensor.deactivate();
    wheels.left(0);
    wheels.right(0);
    isActive = false;
    lights.celebrate();
  }
}

/* exported objects */
module.exports = {
  initialize: function() {
    isActive = false;

    var distance_sensor = new five.Proximity(mbot.PROXIMITY_SENSOR);

    distance_sensor.on("change", function() {
      sensorChange(this["inches"]);
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
