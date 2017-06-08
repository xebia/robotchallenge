var assert = require("chai").assert;
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;
var sinon = require("sinon");
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
    this.robot = new Robot(board);
    this.moveSpy = this.sinon.spy(this.robot, "move");
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
  });

  after(function() {
    this.moveSpy.restore();
  });
});