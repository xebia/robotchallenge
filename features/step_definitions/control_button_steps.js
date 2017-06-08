var assert = require("chai").assert;

var leftWheelSpy, rightWheelSpy;

module.exports = function() {
  this.When(/^I press the power button$/, function (done) {
    this.clock.tick(2000);
    this.startButton.click();
    done();
  });

  this.Then(/^the robot starts going forward$/, function (done) {
    assert(this.leftWheelSpy.callCount === 1, "left wheel is not called.");
    assert(parseInt(this.leftWheelSpy.args[0]) === 1, "left wheel is not started with speed 1");
    assert(parseInt(this.rightWheelSpy.args[0]) === 1, "right wheel is not started with speed 1");
    done();
  });

  this.Then(/^the robot stops$/, function (done) {
    assert(this.leftWheelSpy.callCount === 2, "left wheel is not called.");
    assert(parseInt(this.leftWheelSpy.args[1]) === 0, "left wheel has not stopped");
    assert(parseInt(this.rightWheelSpy.args[1]) === 0, "right wheel has not stopped");
    done();
  });
}
