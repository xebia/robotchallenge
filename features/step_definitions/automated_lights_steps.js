var assert = require("chai").assert;

/* TODO
constant sunlight
GETTINGDARK=2
GETTINGLIGHT=9
*/

module.exports = function() {
  this.Given(/^the robot is traveling on the course in the dark$/, function (done) {
    this.clock.tick(2000);
    this.startButton.click(this.robot);
    this.automatedLight.sensorChange(this.constants.GETTINGLIGHT, this.robot);
    done();
  });
  this.When(/^it turns dark$/, function (done) {
    this.automatedLight.sensorChange(this.constants.GETTINGDARK, this.robot);
    done();
  });
  this.When(/^it turns light$/, function (done) {
    this.automatedLight.sensorChange(this.constants.GETTINGLIGHT, this.robot);
    done();
  });
  this.Then(/^robot turns on it's lights$/, function (done) {
    assert(this.lightOnSpy.callCount === 1, "light has not been turned on.");
    done();
  });
  this.Then(/^robot turns off it's lights$/, function (done) {
    assert(this.lightOffSpy.callCount === 1, "light has not been turned on.");
    done();
  });
}
