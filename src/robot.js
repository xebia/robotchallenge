var mbot = require("./mbotlayout");
var five = require("johnny-five");
const driveSpeed = 100;

function Robot(board) {
  this.board = board;
  this.leftMotor = new five.Motor(mbot.LEFT_MOTOR);
  this.rightMotor = new five.Motor(mbot.RIGHT_MOTOR);
  this.isActive = false;

  this.activate = function() {
    this.board.info("Robot", "Activate");
    this.isActive = true;
  };

  this.getState = function() {
    return this.isActive;
  };

  this.move = function(leftSpeed, rightSpeed) {
    if (this.getState()) {
      this.left(leftSpeed);
      this.right(rightSpeed);
    }
  };

  this.left = function(speed) {
    if (speed > 1 || speed < -1) throw "supplied speed must be between -1 and 1";
    if (speed == 0) {
      this.leftMotor.stop();
    } else if (speed > 0) {
      this.leftMotor.reverse(parseInt(speed*driveSpeed));
    } else {
      this.leftMotor.forward(parseInt(speed*driveSpeed)*-1);
    }
  };

  this.right = function(speed) {
    if (speed > 1 || speed < -1) throw "supplied speed must be between -1 and 1";
    if (speed == 0) {
      this.rightMotor.stop();
    } else if (speed > 0) {
      this.rightMotor.forward(parseInt(speed*driveSpeed));
    } else {
      this.rightMotor.reverse(parseInt(speed*driveSpeed)*-1);
    }
  };

  this.goForward = function() {
    this.move(1,1);
    this.board.info("Robot", "Move forward");
  };/*

  this.goLeft = function() {
    this.move(0,100);
    this.board.info("Robot", "Move left");
  };

  this.goRight = function() {
    this.move(100,0);
    this.board.info("Robot", "Move right");
  };*/

  this.stop = function() {
    this.board.info("Robot", "Stop");
    this.leftMotor.stop();
    this.rightMotor.stop();
    this.isActive = false;
  };
}

module.exports = Robot;