/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var wheels = require("./wheels");
var lights = require("./lights");
var lineSensor = require("./linesensor");

/* private variables */
var isActive;
const PieInYourPantstolerance = 2;
const turnOnLightTolerance = 4;

var sensorChange = function(value) {
  if (!isActive) return;

  if (value < turnOnLightTolerance) {
    console.log('This is getting too dark for me.');
    lights.turnOnLights();
    setTimeout(function() {
      lights.turnOffLights();
    },2000);
  }

  if (value < PieInYourPantstolerance) {
    console.log('I.. a...m... scared...');
    lineSensor.deactivate();
    wheels.left(0);
    wheels.right(0);
  }
}

/* exported objects */
module.exports = {
  initialize: function() {
    isActive = false;

    var light_sensor = new five.Sensor(mbot.LIGHT_SENSOR);

    light_sensor.scale(0, 10).on("change", function() {
      sensorChange(this.value);
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
