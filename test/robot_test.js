var assert = require("chai").assert;
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;
var sinon = require("sinon");
var clock = sinon.useFakeTimers();
MockFirmata.Firmata.prototype.write = function() {}

var Robot = require("../src/robot");

var board = new Board({
  io: new MockFirmata.Firmata(),
  debug: false,
  repl: false
});

describe("the robot", function(){
  before(function() {
    this.sinon = sinon;
    this.clock = clock;
    this.robot = new Robot(board);

    this.startButton = require("../src/modules/startbutton");
    this.followLine = require("../src/modules/followline");
    this.automatedLight = require("../src/modules/automatedlight");
    this.finish = require("../src/modules/finish");
    this.automatedLight.initialize(this.robot);
    this.followLine.initialize(this.robot);
    this.finish.initialize(this.robot);
    this.startButton.initialize(this.robot);
    this.robot.initialize(this.automatedLight,this.followLine,this.finish);

    this.moveSpy = this.sinon.spy(this.robot, "move");
    this.followLineDeactivateSpy = this.sinon.spy(this.followLine, "deactivate");
  });

  it("will become active when activated", function() {
    this.robot.activate();
    assert(this.robot.getState(), "robot is not activated");
  });

  it("will go forward when asked", function() {
    this.robot.goForward();
    assert(this.moveSpy.withArgs(1,1), "robot has not moved forward correctly");
  });

  it("will become inactive when stopped", function() {
    this.robot.stop();
    assert(this.robot.getState() === false, "robot is still active");
    assert(this.followLineDeactivateSpy.callCount === 1, "followline has not been deactivated");
  });

  it("will turn on lights when asked", function() {
    this.robot.turnOnLights();
    assert(this.robot.lightStatus === true, "robot has not turned on lights");
  });

  it("will turn off lights when asked", function() {
    this.robot.turnOffLights();
    assert(this.robot.lightStatus === false, "robot has not turned off lights");
  });

  it("can celebrate", function() {
    this.robot.celebrate();
    assert(this.robot.celebrating, "robot is not celebrating");
  });

  after(function() {
    this.moveSpy.restore();
  });
});