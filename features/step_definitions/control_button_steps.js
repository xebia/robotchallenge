var assert = require("chai").assert;

var leftWheelSpy, rightWheelSpy;

module.exports = function() {
  this.When(/^I press the power button$/, function (done) {
    this.clock.tick(2000);
    this.startButton.click(this.robot);
    done();
  });

  this.Then(/^the robot starts going forward$/, function (done) {
    assert(this.moveForwardSpy.callCount === 1, "robot is not moving forward");
    assert(parseInt(this.leftWheelSpy.args[0]) === 1, "left wheel is not started with speed 1");
    assert(parseInt(this.rightWheelSpy.args[0]) === 1, "right wheel is not started with speed 1");
    done();
  });

  this.Then(/^the robot stops$/, function (done) {
    var lastMove = this.leftWheelSpy.callCount - 1;
    assert(this.stopSpy.callCount === 1, "robot is not stopped");
    assert(parseInt(this.leftWheelSpy.args[lastMove]) === 0, "left wheel is not stopped");
    assert(parseInt(this.rightWheelSpy.args[lastMove]) === 0, "right wheel is not stopped");
    done();
  });
}
