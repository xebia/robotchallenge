var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});
var mbot = require("./mbotlayout");

var Robot = require("./robot");
var startButton = require("./modules/startbutton");
var followLine = require("./modules/followline");
var automatedLight = require("./modules/automatedlight");
var finish = require("./modules/finish");


board.on("ready", function(){
  this.robot = new Robot(board);

  followLine.initialize(this.robot);
  automatedLight.initialize(this.robot);
  //finish.initialize(this.robot);
  startButton.initialize(this.robot);
});