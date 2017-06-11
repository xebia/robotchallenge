var mbot = require("./mbotlayout");
var five = require("johnny-five");
var pixel = require("node-pixel");
const driveSpeed = 100;

function Robot(board) {
  this.board = board;
  this.isActive = false;
  this.lightStatus = false;
  this.celebrating;
  this.leds;

  this.initialize = function(automatedLight,followline,finish) {
    this.automatedLights = automatedLight;
    this.followline = followline;
    this.finish = finish;
  };

  this.activate = function() {
    this.board.info("Robot", "Activate");
    this.leftMotor = new five.Motor(mbot.LEFT_MOTOR);
    this.rightMotor = new five.Motor(mbot.RIGHT_MOTOR);
    var mbotStrip = mbot.LEDS;
    mbotStrip.board = board;
    this.leds = new pixel.Strip(mbotStrip);
    this.isActive = true;
    this.goForward();
    this.turnOffLights();

    this.automatedLights.activate();
    this.followline.activate();
    this.finish.activate();
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
    if (speed > 1 || speed < -1) throw new Error("supplied speed must be between -1 and 1");
    if (speed == 0) {
      this.leftMotor.stop();
    } else if (speed > 0) {
      this.leftMotor.reverse(parseInt(speed*driveSpeed));
    } else {
      this.leftMotor.forward(parseInt(speed*driveSpeed)*-1);
    }
  };

  this.right = function(speed) {
    if (speed > 1 || speed < -1) throw new Error("supplied speed must be between -1 and 1");
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
  };

  this.stop = function() {
    this.board.info("Robot", "Stop");
    this.move(0,0);
    this.leftMotor.stop();
    this.rightMotor.stop();
    this.automatedLights.deactivate();
    this.followline.deactivate();
    this.finish.deactivate();
    this.isActive = false;
  };

  this.turnOnLights = function() {
    this.leds.color("#ffffff");
    this.leds.show();
    this.lightStatus = true;
  };

  this.turnOffLights = function() {
    this.lightStatus = false;
    if (this.celebrating) {
      clearInterval(this.celebrating);
    }
    var leds = this.leds;
    lightOnTimer = setTimeout(function() {
      leds.color("#000");
      leds.show();
    },200);
  };

  this.celebrate = function() {
    var fps = 10;

    console.log("FINISH!");

    var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
    var current_colors = [0,1,2,3,4];
    var current_pos = [0,1,2,3,4];
    var leds = this.leds;
    this.celebrating = setInterval(function() {

      leds.color("#000"); // blanks it out

      for (var i=0; i< current_pos.length; i++) {
        if (++current_pos[i] >= leds.stripLength()) {
          current_pos[i] = 0;
          if (++current_colors[i] >= colors.length) current_colors[i] = 0;
        }
        leds.pixel(current_pos[i]).color(colors[current_colors[i]]);
      }

      leds.show();
    }, 1000/fps);
  };
}

module.exports = Robot;