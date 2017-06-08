var assert = require("chai").assert;

module.exports = function() {
  this.When(/^the robot encounters the finish bulls\-eye$/, function (done) {
    this.distanceSensor.sensorChange(this.constants.FINISHDISTANCE);
    done();
  });
  this.Then(/^the robot stops in the middle of the bulls\-eye$/, function (done) {
    var lastLeftSpeed = parseInt(this.leftWheelSpy.args[this.leftWheelSpy.callCount-1]);
    var lastRightSpeed = parseInt(this.rightWheelSpy.args[this.rightWheelSpy.callCount-1]);

    assert(lastLeftSpeed === 0, "left wheel has not stopped");
    assert(lastRightSpeed === 0, "right wheel has not stopped");
    assert(this.celebrateSpy.callCount === 1, "Robot is not celebrating");
    done();
  });
}
