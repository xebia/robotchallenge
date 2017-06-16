var mbot = require("./mbotlayout");
var five = require("johnny-five");
var pixel = require("node-pixel");

const SPEED = 100;

function Robot(board) {
  this.board = board;
  this.isActive = false;

  setTimeout(() => {
    this.leftMotor = new five.Motor(mbot.LEFT_MOTOR);
    this.rightMotor = new five.Motor(mbot.RIGHT_MOTOR);
    
  }, 2000);
  
  this.log = function(message) {
    this.board.info("Human", message);
  };

  this.activate = function() {
    this.board.info("Robot", "Activate");
    this.isActive = true;
  };

  this.initiateLeds = function() {
    var mbotStrip = mbot.LEDS;
    mbotStrip.board = board;
    this.leds = new pixel.Strip(mbotStrip);
  }

  this.goForward = function() {
    this.move(SPEED, SPEED);
    this.board.info("Robot", "Move forward");
  };

  this.goLeft = function(sharpness) {
    this.move(this.cornerSpeed(sharpness), SPEED);
    this.board.info("Robot", "Move left");
  };

  this.goRight = function(sharpness) {
    this.move(SPEED, this.cornerSpeed(sharpness));
    this.board.info("Robot", "Move right");
  };

  this.cornerSpeed = function(sharpness) {
    // 0 -> +SPEED | 0.5 -> 0 | 1 -> -SPEED
    var speed = 0;
    if (sharpness >= 0 && sharpness <= 1) {
      speed = Math.round(SPEED * (sharpness*-2+1));
    }
    // the mbot can't handle speeds that are too low
    if (Math.abs(speed) <= 50) {
      speed = 0;
    }
    return speed;
  };

  this.move = function(leftSpeed, rightSpeed) {
    if (this.isActive) {
      this.setLeftMotorSpeed(leftSpeed);
      this.setRightMotorSpeed(rightSpeed);
    }
  };

  this.setLeftMotorSpeed = function(speed) {
    if (speed >= 0) {
      this.leftMotor.reverse(speed);
    } else {
      this.leftMotor.forward(Math.abs(speed));
    }
  };

  this.setRightMotorSpeed = function(speed) {
    if (speed >= 0) {
      this.rightMotor.forward(speed);
    } else {
      this.rightMotor.reverse(Math.abs(speed));
    }
  };

  this.turnOnLights = function() {
    if (this.leds) {
      this.leds.color("#fff");
      this.leds.show();
    }
  };

  this.turnOffLights = function() {
    if (this.leds) {
      this.leds.color("#000");
      this.leds.show();
    }
  };

  this.stop = function() {
    this.board.info("Robot", "Stop");
    this.leftMotor.stop();
    this.rightMotor.stop();
    this.isActive = false;
  };
}

module.exports = Robot;
