var assert = require("chai").assert;

module.exports = function() {

  this.Given(/^the robot is standing still on the course$/, function(done) {
    done();
  });

  this.Given(/^the robot is traveling on the course$/, function (done) {
    this.clock.tick(2000);
    this.startButton.click();
    done();
  });
}
