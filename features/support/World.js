/* SHARED UTILS */
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;

/*
hack to enable mock while using node-pixel
PR is waiting approvement: https://github.com/rwaldron/mock-firmata/pull/2
Once this PR has been merged, remove these comments + the mocked write() function
 */
MockFirmata.Firmata.prototype.write = function() {}

var board = new Board({
  io: new MockFirmata.Firmata(),
  debug: false,
  repl: false
})
var sinon = require("sinon");
var clock = sinon.useFakeTimers();

function World() {
  //specifying the world
  this.clock = clock;
  this.sinon = sinon;
  this.board = board;
  this.constants = require("./constants");
  this.sandbox = this.sinon.sandbox.create();
}

module.exports = function() {
  this.World = World;
}
