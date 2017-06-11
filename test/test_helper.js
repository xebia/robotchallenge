global.assert = require("chai").assert;
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

afterEach(function() {
    this.sandbox.restore();
});