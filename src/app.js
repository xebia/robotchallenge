var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});
var mbot = require("./mbotlayout");

var Robot = require("./robot");
var startButton = require("./robot/startbutton");
var lineSensor = require("./robot/linesensor");
var lightSensor = require("./robot/lightsensor");
var distanceSensor = require("./robot/distancesensor");
var lights = require("./robot/lights");

//var stdin = process.openStdin();
//require("tty").setRawMode(true);

board.on("ready", function(){
  this.robot = new Robot(board);
  //startbutton.initialize(this.robot);
  //followline.initialize(this.robot);

  lights.initialize(board);
  lineSensor.initialize(this.robot);
  lightSensor.initialize(this.robot);
  distanceSensor.initialize(this.robot);
  startButton.initialize(this.robot);
});

/*stdin.on("keypress", function(chunk, key) {
  // process the keypresses

  //if (key) {
    switch (key.name) {
      case "up":
        wheels.left(1);
        wheels.right(1);
        //console.log("test forward");
        break;
      case "down":
        wheels.left(-1);
        wheels.right(-1);
        //console.log("test backward");
        break;
      case "left":
        wheels.left(-1);
        wheels.right(1);
        //console.log("test left");
        break;
      case "right":
        wheels.left(1);
        wheels.right(-1);
        //console.log("test right");
        break;
      case "space":
        wheels.left(0);
        wheels.right(0);
        //console.log("test stop");
        break;
    }
  //}
});
*/