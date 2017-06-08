/* SHARED OBJECTS */

var myHooks = function () {
  this.Before(function (scenario) {
    this.lights = require("../../src/robot/lights");
    this.wheels = require("../../src/robot/wheels");
    this.lineSensor = require("../../src/robot/linesensor");
    this.lightSensor = require("../../src/robot/lightsensor");
    this.distanceSensor = require("../../src/robot/distancesensor");
    this.startButton = require("../../src/robot/startbutton");

    //constructing robot
    this.lights.initialize(this.board);
    this.wheels.initialize();
    this.lineSensor.initialize();
    this.lightSensor.initialize();
    this.distanceSensor.initialize();
    this.startButton.initialize();

    //specifying spies that are used in multiple specs
    this.leftWheelSpy = this.sandbox.spy(this.wheels, "left");
    this.rightWheelSpy = this.sandbox.spy(this.wheels, "right");
    this.lightOnSpy = this.sandbox.spy(this.lights, "turnOnLights");
    this.celebrateSpy = this.sandbox.spy(this.lights, "celebrate");
    this.lightOffSpy = this.sandbox.spy(this.lights, "turnOffLights");
  });

  this.After(function (scenario) {
    this.lineSensor.deactivate();
    this.sandbox.restore();
  })
};

module.exports = myHooks;
