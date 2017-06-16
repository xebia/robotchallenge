var assert = require("chai").assert;

module.exports = function() {

  this.Given(/^the robot is powered on$/, function(done) {
    done();
  });

  this.When(/^I start the robot$/, function (done) {
    this.clock.tick(2000);
    this.start.activateAndMoveForward(this.robot);
    done();
  });

  this.Then(/^the robot starts moving$/, function (done) {
    assert(this.goForwardSpy.callCount === 1, "Go Forward function not yet called.");
    done();
  });

};
