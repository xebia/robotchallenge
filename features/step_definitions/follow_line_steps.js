var assert = require("chai").assert;

module.exports = function() {

  this.Given(/^the robot is traveling on the course$/, function (done) {
      this.robot.activate();
      this.clock.tick(2000);
      this.followline.setRobot(this.robot);
      done();
  });

  this.When(/^the robot goes off the course of the (left|right)$/, function (side, done) {
    switch (side) {
      case "left":
        this.followline.rightSensorChange(0);
        this.followline.leftSensorChange(1);
        this.followline.changeDirection();
        break;
      case "right":
        this.followline.rightSensorChange(1);
        this.followline.leftSensorChange(0);
        this.followline.changeDirection();
        break;
      default:
        assert(0 === 1, "unknown side specified");
    }
    done();
  });

  this.Then(/^the robot steers to the (left|right)$/, function (direction, done) {
    switch (direction) {
      case "left":
        assert(this.goLeftSpy.callCount === 1, "Go Left function not yet called.");
        assert(this.goRightSpy.callCount === 0, "Go Right function incorrectly called.");
        break;
      case "right":
        assert(this.goLeftSpy.callCount === 0, "Go Left function incorrectly called.");
        assert(this.goRightSpy.callCount === 1, "Go Right function not yet called.");
        break;
      default:
        assert(0 === 1, "unknown direction specified");
    }
    done();
  });

  this.Given(/^the robot is not entirely on course$/, function(done) {
    this.robot.activate();
    this.clock.tick(2000);
    this.followline.setRobot(this.robot);
    this.followline.rightSensorChange(1);
    this.followline.leftSensorChange(0);
    this.followline.changeDirection();
    done();
  });

  this.When(/^the robot returns to the course$/, function (done) {
    this.followline.rightSensorChange(0);
    this.followline.changeDirection();
    done();
  });

  this.Then(/^the robot goes straight$/, function (done) {
    assert(this.goForwardSpy.callCount === 1, "Go Forward function not yet called.");
    done();
  });

  this.Given(/^the robot encounters a sharp corner$/, function (done) {
    this.robot.activate();
    this.followline.setRobot(this.robot);
    this.followline.rightSensorChange(0);
    this.followline.leftSensorChange(0);
    this.clock.tick(2000);
    this.followline.leftSensorChange(1);
    this.followline.changeDirection();
    this.followline.rightSensorChange(1);
    this.followline.changeDirection();
    assert(this.followline.inSharpCorner(), "Robot didn't detect sharp corner!");
    done();
  });

this.When(/^the robot finds the angle of the (left|right) corner$/, function (direction, done) {
    switch (direction) {
      case "left":
        this.clock.tick(2000);
        this.followline.leftSensorChange(0);
        this.followline.changeDirection();
        break;
      case "right":
        this.clock.tick(1000);
        this.followline.rightSensorChange(0);
        this.followline.changeDirection();
        break;
      default:
        assert(0 === 1, "unknown direction specified");
    }
    done();
  });

this.Then(/^the robot takes a (left|right) corner$/, function (direction, done) {
  switch (direction) {
      case "left":
        assert(this.goLeftSpy.callCount === 2, "Go Left function not yet called.");
        assert(this.goRightSpy.callCount >= 1, "Go Right function not yet called.");
        break;
      case "right":
        assert(this.goLeftSpy.callCount === 0, "Go Left function incorrectly called.");
        assert(this.goRightSpy.callCount >= 1, "Go Right function not yet called.");
        break;
      default:
        assert(0 === 1, "unknown direction specified");
    }
    assert(!this.followline.inSharpCorner(), "Still in sharp corner!");
    done();
  });

};
