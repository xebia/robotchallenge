/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");
var followLine = require("./followline");

/* private variables */
var isActive;
const PieInYourPantstolerance = 2;
const turnOnLightTolerance = 4;

var sensorChange = function(value, robot) {
  //console.log('sensing: ' + value);
  if (!isActive) return;
  console.log('sensing: ' + value);

  if (value < turnOnLightTolerance) {
    console.log('This is getting too dark for me.');
    robot.turnOnLights();
    setTimeout(function() {
      robot.turnOffLights();
    },2000);
  }

  if (value < PieInYourPantstolerance) {
    console.log('I.. a...m... scared...');
    followLine.deactivate();
    robot.move(0,0);
  }
}

/* exported objects */
module.exports = {
  initialize: function(robot) {
    isActive = false;

    var light_sensor = new five.Sensor(mbot.LIGHT_SENSOR);

    light_sensor.scale(0, 10).on("change", function() {
      sensorChange(this.value, robot);
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
