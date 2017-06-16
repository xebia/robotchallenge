var assert = require("chai").assert;

module.exports = function() {

    this.When(/^it turns dark$/, function (done) { 
       this.lights.determineLightness(this.robot, 90);
        done();
    });

    this.Then(/^robot turns on its lights$/, function (done) {
        assert(this.lightsOnSpy.callCount >= 1, "Lights-on not called");
        done();
    });

    this.Given(/^the robot is traveling on the course in the dark$/, function (done) {
        this.robot.activate();
        for (var i = 0; i <= 10; i++) {
            this.lights.determineLightness(this.robot, 98);
        }
        this.lights.determineLightness(this.robot, 90);
        assert(this.lightsOnSpy.callCount >= 1, "Lights-on not called");
        done();
    });

    this.When(/^its no longer dark$/, function (done) {
        for (var i = 0; i <= 10; i++) {
            this.lights.determineLightness(this.robot, 98);
        }
        done();
    });


    this.Then(/^robot turns off its lights$/, function (done) {
        assert(this.lightsOffSpy.callCount >= 1, "Lights-off not called");
        done();
    });

}