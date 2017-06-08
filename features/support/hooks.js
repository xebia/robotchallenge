/* SHARED OBJECTS */

var myHooks = function () {
  this.Before(function (scenario) {
    var Robot = require("../../src/robot");
    this.startButton = require("../../src/modules/startbutton");
    this.followLine = require("../../src/modules/followline");
    this.automatedLight = require("../../src/modules/automatedlight");
    this.finish = require("../../src/modules/finish");

    this.robot = new Robot(this.board);
    this.followLine.initialize(this.robot);
    this.automatedLight.initialize(this.robot);
    this.finish.initialize(this.robot);
    this.startButton.initialize(this.robot);

    //specifying spies that are used in multiple specs
    this.moveSpy = this.sandbox.spy(this.robot, "move");
    this.leftWheelSpy = this.sandbox.spy(this.robot, "left");
    this.rightWheelSpy = this.sandbox.spy(this.robot, "right");
    this.moveForwardSpy = this.sandbox.spy(this.robot, "goForward");
    this.stopSpy = this.sandbox.spy(this.robot, "stop");
    this.lightOnSpy = this.sandbox.spy(this.robot, "turnOnLights");
    this.celebrateSpy = this.sandbox.spy(this.robot, "celebrate");
    this.lightOffSpy = this.sandbox.spy(this.robot, "turnOffLights");
  });

  this.After(function (scenario) {
    this.followLine.deactivate();
    this.sandbox.restore();
  })
};

module.exports = myHooks;
