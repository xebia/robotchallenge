var assert = require("chai").assert;
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;
var sinon = require("sinon");
var clock = sinon.useFakeTimers();

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
    clock.tick(2000);
    this.moveSpy = this.sinon.spy(this.robot, "move");
  });

  it("will become active when activated", function() {
    this.robot.activate();
    assert(this.robot.isActive, "robot is not activated");
  });

  it("will go forward when asked", function() {
    this.robot.goForward();
    assert(this.moveSpy.withArgs(101,101).calledOnce, "robot has not moved forward correctly");
  });

  it("will go left when asked", function() {
    this.robot.goLeft(0.2);
    assert(this.moveSpy.withArgs(60,100).calledOnce, "robot has not moved left correctly");
  });

  it("will go right when asked", function() {
    this.robot.goRight(0.2);
    assert(this.moveSpy.withArgs(99,60).calledOnce, "robot has not moved right correctly");
  });

  it("will become inactive when stopped", function() {
    this.robot.stop();
    assert(this.robot.isActive === false, "robot is still active");
  });

  after(function() {
    this.moveSpy.restore();
  });
});
