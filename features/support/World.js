/* SHARED UTILS */
var MockFirmata = require("mock-firmata");
var Board = require("johnny-five").Board;

var board = new Board({
  io: new MockFirmata.Firmata(),
  debug: false,
  repl: false
});

var sinon = require("sinon");
var clock = sinon.useFakeTimers();

function World() {
  this.clock = clock;
  this.sinon = sinon;
  this.board = board;
  this.sandbox = this.sinon.sandbox.create();
}

module.exports = function() {
  this.World = World;
};
