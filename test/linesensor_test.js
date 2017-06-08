var assert = require("chai").assert;
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;
var sinon = require("sinon");
var clock = sinon.useFakeTimers();
MockFirmata.Firmata.prototype.write = function() {}

var board = new Board({
  io: new MockFirmata.Firmata(),
  debug: false,
  repl: false
})

describe('my test suite', function(){
  before(function() {
    this.clock = clock;
    this.sinon = sinon;
    this.board = board;
    this.sandbox = this.sinon.sandbox.create();

    this.lights = require("../src/robot/lights");
    this.wheels = require("../src/robot/wheels");
    this.lineSensor = require("../src/robot/linesensor");
    this.lightSensor = require("../src/robot/lightsensor");
    this.distanceSensor = require("../src/robot/distancesensor");
    this.startButton = require("../src/robot/startbutton");

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
  });

  it('will turn the other direction after not finding the line after +/- 110 degrees', function() {
    this.clock.tick(2000);
    this.startButton.click();
    this.lineSensor.sensorChange("left",1);
    this.lineSensor.sensorChange("right",1);
    this.clock.tick(2000);
    var lastLeftSpeed = parseInt(this.leftWheelSpy.args[this.leftWheelSpy.callCount-1]);
    var lastRightSpeed = parseInt(this.rightWheelSpy.args[this.rightWheelSpy.callCount-1]);
    assert(lastLeftSpeed < lastRightSpeed, "robot is not steering to the left");
  });
});
