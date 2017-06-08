var assert = require("chai").assert;

module.exports = function() {
  this.When(/^the robot stays on track$/, function (done) {
    done();
  });

  this.When(/^the robot goes off the course of the right side$/, function (done) {
    this.lineSensor.sensorChange("right",this.constants.NOLINESENSED);
    done();
  });

  this.When(/^the robot goes off the course of the left side$/, function (done) {
    this.lineSensor.sensorChange("left",this.constants.NOLINESENSED);
    done();
  });

  this.Then(/^the robot doesn’t steer$/, function (done) {
    assert(this.leftWheelSpy.callCount === 1, "left wheel expected to be called once.");
    assert(this.rightWheelSpy.callCount === 1, "right wheel expected to be called once.");
    assert(parseInt(this.leftWheelSpy.args[0]) === parseInt(this.rightWheelSpy.args[0]), "robot is steering");
    done();
  });

  this.Then(/^the robot steers to the left$/, function (done) {
    console.log('callcount: ' + this.leftWheelSpy.callCount);
    assert(this.leftWheelSpy.callCount === 2, "left wheel expected to be called twice.");
    assert(this.rightWheelSpy.callCount === 2, "right wheel expected to be called twice.");
    assert(parseInt(this.leftWheelSpy.args[1]) < parseInt(this.rightWheelSpy.args[1]), "robot is not steering to the left")
    done();
  });

  this.Then(/^the robot steers to the right$/, function (done) {
    console.log('callcount: ' + this.leftWheelSpy.callCount);
    assert(this.leftWheelSpy.callCount === 2, "left wheel expected to be called twice.");
    assert(this.rightWheelSpy.callCount === 2, "right wheel expected to be called twice.");
    assert(parseInt(this.leftWheelSpy.args[1]) > parseInt(this.rightWheelSpy.args[1]), "robot is not steering to the left")
    done();
  });
}
