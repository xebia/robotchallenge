/* dependencies */
var mbot = require("../mbotlayout");
var five = require("johnny-five");

/* private variables */
var l_motor, r_motor;
const driveSpeed = 100;

/* exported object */
module.exports = {
  initialize: function() {
    if (!l_motor) {
      l_motor = new five.Motor(mbot.LEFT_MOTOR);
    }
    if (!r_motor) {
      r_motor = new five.Motor(mbot.RIGHT_MOTOR);
    }
  },
  left: function(speed) {
    if (speed > 1 || speed < -1) throw "supplied speed must be between -1 and 1";
    if (speed == 0) {
      l_motor.stop();
    } else if (speed > 0) {
      l_motor.reverse(parseInt(speed*driveSpeed));
    } else {
      l_motor.forward(parseInt(speed*driveSpeed)*-1);
    }
  },
  right: function(speed) {
    if (speed > 1 || speed < -1) throw "supplied speed must be between -1 and 1";
    if (speed == 0) {
      r_motor.stop();
    } else if (speed > 0) {
      r_motor.forward(parseInt(speed*driveSpeed));
    } else {
      r_motor.reverse(parseInt(speed*driveSpeed)*-1);
    }
  }
}
