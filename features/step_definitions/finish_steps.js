var assert = require("chai").assert;

module.exports = function() {
    this.When(/^the robot encounters the finish$/, function (done) {
        this.finish.determineIfFinishReached(this.robot, 9);
        done();
    });

    this.Then(/^the robot stops$/, function (done) {
        assert(this.stopSpy.callCount === 1, "Stop wasn't called.");
        done();
    });

    this.When(/^the robot hasn't reached the finish yet$/, function (done) {
        this.finish.determineIfFinishReached(this.robot, 11);
        done();
    });

    this.Then(/^the robot hasn't stopped$/, function (done) {
        assert(this.stopSpy.callCount === 0, "Stop was called before the finish.");
        done();
    });
};