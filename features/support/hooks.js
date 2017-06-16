/* SHARED OBJECTS */

var Robot = require("../../src/robot");

var myHooks = function () {
  this.Before(function (scenario) {
    this.start = require("../../src/modules/start");
    this.followline = require("../../src/modules/followline");

    //constructing robot
    this.robot = new Robot(this.board);

    //specifying spies that are used in multiple specs
    this.goForwardSpy = this.sandbox.spy(this.robot, "goForward");
    this.goLeftSpy = this.sandbox.spy(this.robot, "goLeft");
    this.goRightSpy = this.sandbox.spy(this.robot, "goRight");
  });

  this.After(function (scenario) {
    this.sandbox.restore();
  });
};

module.exports = myHooks;
