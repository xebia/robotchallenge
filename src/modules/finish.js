/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");

/* private variables */
var isActive;
const closeRange = 2;

var sensorChange = function(value, robot) {
  if (!isActive) return;

  if (value < closeRange) {
    robot.stop();
    isActive = false;
    robot.celebrate();
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
