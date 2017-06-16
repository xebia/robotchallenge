var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});

var Robot = require("./robot");
var startbutton = require("./modules/start");
var followline = require("./modules/followline");
var finish = require("./modules/finish");

board.on("ready", function(){
  this.robot = new Robot(board);
  this.robot.initiateLeds();
  startbutton.initialize(this.robot);
  followline.initialize(this.robot);
  finish.initialize(this.robot);
});
