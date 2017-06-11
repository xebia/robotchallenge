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
  beforeEach(function() {
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

    this.sandbox = this.sinon.sandbox.create();
    this.moveSpy = this.sandbox.spy(this.robot, "move");
    this.followLineDeactivateSpy = this.sandbox.spy(this.followLine, "deactivate");
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
    this.robot.activate();
    assert(this.robot.getState(), "robot is not activated");
    this.robot.stop();
    assert(this.robot.getState() === false, "robot is still active");
  });

  it("will turn on lights when asked", function() {
    this.robot.activate();
    this.robot.turnOnLights();
    assert(this.robot.lightStatus === true, "robot has not turned on lights");
  });

  it("will turn off all lights when asked, even if it was celebrating", function() {
    this.robot.activate();
    this.robot.celebrate();
    this.robot.turnOffLights();
    assert(this.robot.lightStatus === false, "robot has not turned off lights");
  });

  it("can celebrate", function() {
    this.robot.celebrate();
    assert(this.robot.celebrating, "robot is not celebrating");
  });

  describe("robot error handling", function(){
    it("can throw errors if incorrect values are passed to the wheels", function() {
      this.robot.activate();
      var robot = this.robot;

      assert.throws(function() {
        robot.left(2)
      }, Error, "supplied speed must be between -1 and 1");
    });

    it("can throw errors if incorrect values are passed to the wheels", function() {
      this.robot.activate();
      var robot = this.robot;

      assert.throws(function() {
        robot.right(2)
      }, Error, "supplied speed must be between -1 and 1");
    });
  });

  describe("the follow line feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.followLine.sensorChange("right",1, this.robot);
      
      assert(this.moveSpy.callCount === 0, "robot has incorrectly started moving");
    });

    it("can move forward once the both sensors find black", function() {
      this.robot.activate();
      this.followLine.sensorChange("right",0, this.robot);
      this.followLine.sensorChange("left",0, this.robot);
      assert(this.moveSpy.withArgs(1,1), "robot has not moved forward correctly");
    });

    it("can throw errors if incorrect direction parameters are received from the sensors", function() {
      this.robot.activate();
      var followLine = this.followLine;

      assert.throws(function() {
        followLine.sensorChange("center",1, this.robot)
      }, Error, "direction must be left or right");
    });

    it("can throw errors if incorrect values are received from the sensors", function() {
      this.robot.activate();
      var followLine = this.followLine;

      assert.throws(function() {
        followLine.sensorChange("right",2, this.robot)
      }, Error, "no correct value found");
    });
  });

  describe("the automated lights feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.automatedLight.sensorChange(1, this.robot);
      assert(this.robot.lightStatus === false, "robot has incorrectly turned on lights");
    });
  });

  describe("the finish feature", function(){
    it("does not do anything if the robot is not activated", function() {
      this.finish.sensorChange(1.9, this.robot);
      assert(this.robot.celebrating === undefined, "robot should not be celebrating");
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });
});