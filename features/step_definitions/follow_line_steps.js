var assert = require("chai").assert;

module.exports = function() {

  this.When(/^the robot stays on track$/, function (done) {
    done();
  });

  this.When(/^the robot goes off the course of the right side$/, function (done) {
    this.followLine.sensorChange("right",this.constants.NOLINESENSED, this.robot);
    done();
  });

  this.When(/^the robot goes off the course of the left side$/, function (done) {
    this.followLine.sensorChange("left",this.constants.NOLINESENSED, this.robot);
    done();
  });

  this.When(/^the robot cant find the road on his right for (.*) seconds$/, function (seconds, done) {
    var lastCall = this.leftWheelSpy.callCount - 1;
    assert(parseInt(this.leftWheelSpy.args[lastCall]) > parseInt(this.rightWheelSpy.args[lastCall]), "robot is not steering to the right");
    this.clock.tick(seconds * 1000);
    done();
  });

  this.Then(/^the robot doesn’t steer$/, function (done) {
    assert(this.leftWheelSpy.callCount === 1, "left wheel expected to be called once.");
    assert(this.rightWheelSpy.callCount === 1, "right wheel expected to be called once.");
    assert(parseInt(this.leftWheelSpy.args[0]) === parseInt(this.rightWheelSpy.args[0]), "robot is steering");
    done();
  });

  this.Then(/^the robot steers to the left$/, function (done) {
    var lastCall = this.leftWheelSpy.callCount - 1;
    assert(parseInt(this.leftWheelSpy.args[lastCall]) < parseInt(this.rightWheelSpy.args[lastCall]), "robot is not steering to the left")
    done();
  });

  this.Then(/^the robot steers to the right$/, function (done) {
    var lastCall = this.leftWheelSpy.callCount - 1;
    assert(parseInt(this.leftWheelSpy.args[lastCall]) > parseInt(this.rightWheelSpy.args[lastCall]), "robot is not steering to the right")
    done();
  });
}
